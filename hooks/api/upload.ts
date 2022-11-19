import { BASE_API_URL } from "@config/index";
import { S3UploadURLReq } from "@schemas/GetS3UploadURLReq";
import { S3UploadURLRes } from "@schemas/GetS3UploadURLRes";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { removeAllSpacing } from "@utils/string";
import axios from "axios";

/**
 * @desc - A hook function to fetch S3 upload authentication endpoint.
 * @mutateParam { name: string, type: string }
 * @returns url - string
 */
export const useGetS3UploadURLEndpoint = (
  options?: UseMutationOptions<S3UploadURLRes, any, S3UploadURLReq>
) => {
  return useMutation({
    mutationKey: ["getS3UploadURLEndpoint"],
    mutationFn: async ({ name, type }) => {
      const res = await axios({
        url: `${BASE_API_URL}/upload`,
        method: "POST",
        data: {
          name: removeAllSpacing(name),
          type,
        },
      });

      return res?.data?.url || "";
    },
    ...options,
  });
};
