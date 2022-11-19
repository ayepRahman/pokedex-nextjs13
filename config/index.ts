// TODO: check base on process.env.NODE_ENV

export const BASE_API_URL =
  process.env.ONLYAYEP_BASE_API_URL || "http://localhost:3000/api";
export const AWS_ACCESS_KEY = process.env.ONLYAYEP_AWS_ACCESS_KEY || "";
export const AWS_SECRET_KEY = process.env.ONLYAYEP_AWS_SECRET_KEY || "";
export const S3_BUCKET_NAME = process.env.ONLYAYEP_S3_BUCKET_NAME || "";
export const MONGO_DB_URI = process.env.ONLYAYEP_MONGODB_URI || "";
