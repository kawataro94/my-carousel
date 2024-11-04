export async function multipartUpload(
  r2Bucket: R2Bucket,
  key: string,
  value: File
) {
  const multipartUpload = await r2Bucket.createMultipartUpload(key);

  const partSize = 5 * 1024 ** 3;

  let uploaded = [];
  for (
    let partNumber = 1;
    partNumber <= Math.ceil(value.size / partSize);
    partNumber++
  ) {
    const start = (partNumber - 1) * partSize;
    const end = Math.min(start + partSize, value.size);
    const part = value.slice(start, end);

    const uploadedPart = await multipartUpload.uploadPart(partNumber, part);

    uploaded.push(uploadedPart);
  }

  await multipartUpload.complete(uploaded);
}
