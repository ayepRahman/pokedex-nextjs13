"use client";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { getPreviewImage } from "@utils/image";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

export default function CreatePokemon() {
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {} = useForm();

  console.log(previewImage);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const img = await getPreviewImage(file);

    setFile(file);
    setPreviewImage(img);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png"] },
  });

  const handleClearFile = () => {
    setFile(null);
    setPreviewImage(null);
  };

  /**
   * name, types, abilities, imgUrl
   */

  return (
    <div className="container max-w-[600px] mx-auto px-4 my-5">
      <Card className="lg:flex justify-between gap-4">
        <form className="w-full">
          <h1 className="font-bold"> Create Pokemon</h1>
          <Input placeholder="Pokemon name" className="mt-4" isFullWidth />

          <Button className="mt-4" isFullWidth>
            Create
          </Button>
        </form>
        {/* <div className="bg-purple-400">asdss</div> */}

        <div>
          {!!previewImage && (
            <div className="rounded-md w-[200px] h-[200px] p-4 border relative overflow-hidden">
              <Image className="z-0" src={previewImage} alt="img" fill />
              <XCircleIcon
                onClick={handleClearFile}
                height="1.5rem"
                width="1.5rem"
                className="z-10 absolute top-1 right-1 cursor-pointer"
              />
            </div>
          )}

          {!previewImage && (
            <div
              {...getRootProps()}
              className="rounded-md w-[200px] h-[200px] p-4 border border-dashed border-purple-500 cursor-pointer"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                // eslint-disable-next-line react/no-unescaped-entities
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
