import { z } from "zod";

export const GetS3UploadURLReqSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export type S3UploadURLReq = z.infer<typeof GetS3UploadURLReqSchema>;
