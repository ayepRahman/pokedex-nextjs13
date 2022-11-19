import { AWS_ACCESS_KEY, AWS_SECRET_KEY } from "@config/index";
import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodrParser: {
      sizeLimit: "8mb",
    },
  },
};
