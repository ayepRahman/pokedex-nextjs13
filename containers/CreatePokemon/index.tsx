"use client";

import Button from "@components/Button";
import Card from "@components/Card";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreatePokemon,
  useGetPokemonAbilities,
  useGetPokemonTypes,
} from "@hooks/api/pokemon";
import { useGetS3UploadURLEndpoint } from "@hooks/api/upload";
import {
  CreatePokemonFormData,
  CreatePokemonFormDataEnum,
  createPokemonFormDataSchema,
} from "@schemas/CreatePokemonFormData";
import { CreatePokemonRes } from "@schemas/CreatePokemonInput";
import { getPreviewImage } from "@utils/image";
import { Alert, Spinner, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import Select from "react-tailwindcss-select";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * TODO: fix this once Next.js 13 && RHF is fixed on their side
 * @desc
 * There seem to an issue with Next.js 13 with RHF while building.
 * Suspect due to the esm, that next not able to import RHF correctly.
 * On Next.js 12 it work perfectly. Parking this code here to ref later on.
 */

export default function CreatePokemon() {
  const [createPokemonPayload, setCreatePokemonPayload] =
    useState<CreatePokemonRes | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [typesOptions, setTypesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [abilitiesOptions, setAbilitiesOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // mutations
  const { mutateAsync: getS3UploadURL, isLoading: isGettingUrl } =
    useGetS3UploadURLEndpoint();

  const { mutate: createPokemon, isLoading: isCreatingPokemon } =
    useCreatePokemon({
      onSuccess(data) {
        if (!!data?.success) {
          setCreatePokemonPayload(data);
        }
      },
    });

  // queries
  useGetPokemonTypes({
    onSuccess(data) {
      setTypesOptions(
        data.map((ele) => ({
          label: ele.name,
          value: ele.name,
        }))
      );
    },
  });

  useGetPokemonAbilities({
    onSuccess(data) {
      setAbilitiesOptions(
        data.map((ele) => ({
          label: ele.name,
          value: ele.name,
        }))
      );
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<CreatePokemonFormData>({
    resolver: zodResolver(createPokemonFormDataSchema),
    mode: "onChange",
  });

  const onDropAccepted = useCallback(
    async (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      const img = await getPreviewImage(file);
      const name = file?.name || "";
      const type = file?.type || "";

      const url = await getS3UploadURL({ name, type });

      setValue(CreatePokemonFormDataEnum.Enum.file, file, {
        shouldValidate: true,
      });
      setValue(CreatePokemonFormDataEnum.Enum.url, url, {
        shouldValidate: true,
      });
      setPreviewImage(img);
    },
    [getS3UploadURL, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: { "image/*": [".png"] },
    maxSize: 8388608, // 8mb max file size
  });

  const handleClearFile = () => {
    resetField(CreatePokemonFormDataEnum.Enum.file);
    resetField(CreatePokemonFormDataEnum.Enum.url);
    setPreviewImage("");
  };

  const handleOnSubmit = (values: CreatePokemonFormData) => {
    createPokemon({
      name: values.name,
      types: values.types.map((t) => t.value),
      abilities: values.abilities.map((t) => t.value),
      file: values.file,
      url: values.url,
    });
  };

  return (
    <div className="container max-w-[700px] mx-auto px-4 my-5 flex flex-col h-screen justify-center">
      <Card className=" flex flex-col-reverse lg:flex-row justify-between gap-4">
        <form onSubmit={handleSubmit(handleOnSubmit)} className="w-full m-auto">
          <h1 className="font-bold mb-4  hidden lg:block">Create Pokemon</h1>

          <div className="mb-4">
            <Controller
              control={control}
              name={CreatePokemonFormDataEnum.Enum.name}
              render={({ field: { onChange, value, ref, name } }) => (
                <TextInput
                  ref={ref}
                  name={name}
                  type="text"
                  placeholder="Pokemon name"
                  value={value}
                  onChange={(v) => onChange(v)}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={CreatePokemonFormDataEnum.Enum.name}
              render={({ message }) => (
                <p className=" text-error-300 text-sm mt-2">{message}</p>
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name={CreatePokemonFormDataEnum.Enum.types}
              render={({ field: { onChange, value } }) => (
                <Select
                  isMultiple
                  isClearable
                  onChange={(v) => onChange(v)}
                  value={value as unknown as Option | Option[] | null}
                  options={typesOptions}
                  placeholder="Select your types"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name={CreatePokemonFormDataEnum.Enum.types}
              render={({ message }) => (
                <p className=" text-error-300 text-sm mt-2">{message}</p>
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              control={control}
              name={CreatePokemonFormDataEnum.Enum.abilities}
              render={({ field: { onChange, value } }) => (
                <Select
                  isMultiple
                  isClearable
                  onChange={(v) => onChange(v)}
                  value={value as unknown as Option | Option[] | null}
                  options={abilitiesOptions}
                  placeholder="Select your abilities"
                />
              )}
            />

            <ErrorMessage
              errors={errors}
              name={CreatePokemonFormDataEnum.Enum.abilities}
              render={({ message }) => (
                <p className=" text-error-300 text-sm mt-2">{message}</p>
              )}
            />
          </div>

          <Button
            isLoading={isCreatingPokemon}
            disabled={isCreatingPokemon}
            type="submit"
            gradientDuoTone="purpleToPink"
            fullSized
          >
            Create
          </Button>

          {!!createPokemonPayload && (
            <Alert
              className="mt-4"
              color="success"
              onDismiss={function onDismiss() {
                return alert("Alert dismissed!");
              }}
            >
              You&apos;ve successfully created a pokemon!{" "}
              <Link
                className="underline"
                href={`/pokemon/${createPokemonPayload?.payload?.uid || null}`}
              >
                View
              </Link>
            </Alert>
          )}
        </form>

        <div className="flex flex-col justify-center mx-auto mb-8 lg:mb-0">
          <h1 className="font-bold mb-4 text-center lg:hidden">
            Create Pokemon
          </h1>

          {isGettingUrl && (
            <div className="rounded-md w-[252px] h-[252px] p-4 border relative overflow-hidden flex flex-col  justify-center text-center">
              <Spinner />
            </div>
          )}

          {!!previewImage && !isGettingUrl && (
            <div className="rounded-md w-[252px] h-[252px] p-4 border relative overflow-hidden">
              <Image className="z-0" src={previewImage} alt="img" fill />
              <XCircleIcon
                onClick={handleClearFile}
                height="1.5rem"
                width="1.5rem"
                className="z-10 absolute top-1 right-1 cursor-pointer"
              />
            </div>
          )}
          {!previewImage && !isGettingUrl && (
            <div
              {...getRootProps()}
              className="rounded-md w-[252px] h-[252px] p-4 border border-dashed border-purple-500 cursor-pointer"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image file here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop image file here, or click to select
                  image file
                </p>
              )}
            </div>
          )}

          <ErrorMessage
            errors={errors}
            name={CreatePokemonFormDataEnum.Enum.url}
            render={({ message }) => (
              <p className=" text-error-300 text-sm mt-2">{message}</p>
            )}
          />
        </div>
      </Card>
    </div>
  );
}
