// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { S3_BUCKET_NAME } from "@config/index";
import { s3 } from "@services/aws/s3";
import { handler } from "@utils/api";
import { removeAllSpacing } from "@utils/string";

/**
 * A POST endpoint to fetch s3 signed url endpoint
 * @body { name: string, type: string  }
 * @returns { url: string }
 */
export default handler.post(async (req, res) => {
  const body = req?.body || {};
  const name = body?.name;
  const type = body?.type;

  const fileParams = {
    Bucket: S3_BUCKET_NAME,
    Key: removeAllSpacing(name),
    ContentType: type,
  };

  const url = await s3.getSignedUrlPromise("putObject", fileParams);

  return res.json({ url });
});
