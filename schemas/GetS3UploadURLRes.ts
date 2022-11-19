import { z } from "zod";

const GetS3UploadURLResSchema = z.string();

export type S3UploadURLRes = z.infer<typeof GetS3UploadURLResSchema>;
