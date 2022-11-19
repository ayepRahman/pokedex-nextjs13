// TODO: check base on process.env.NODE_ENV

export const BASE_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_API_URL
    : "http://localhost:3000/api";
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || "";
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || "";
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
