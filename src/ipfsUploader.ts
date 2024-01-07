import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export async function ipfsUploader(pdfByte: any) {
  const pdf_uuid = uuidv4();
  const params = {
    Bucket: 'neu-my-devlet',
    Key: `${pdf_uuid}.pdf`,
    Body: Buffer.from(pdfByte),
    ContentDisposition: 'inline',
    ContentType: 'application/pdf',
  };

  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    },
  });
  const command = new PutObjectCommand(params);

  const response = await client.send(command);

  return pdf_uuid + '.pdf';
}

// import { create } from 'kubo-rpc-client';

// export async function ipfsUploader(pdfBytes: any) {
//   const auth =
//     'Basic ' +
//     Buffer.from(
//       process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID +
//         ':' +
//         process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET
//     ).toString('base64');

//   const ipfs = await create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       authorization: auth,
//     },
//   });
//   const res = await ipfs.add(pdfBytes);

//   return res.path;
// }
