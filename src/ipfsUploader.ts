import { create } from 'kubo-rpc-client';

export async function ipfsUploader(pdfBytes: any) {
  const auth =
    'Basic ' +
    Buffer.from(
      process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID +
        ':' +
        process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET
    ).toString('base64');

  const ipfs = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  });
  const res = await ipfs.add(pdfBytes);

  return res.path;
}
