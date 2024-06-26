import sodium from 'libsodium-wrappers';

const generateKeyPair = async () => {
  await sodium.ready;
  const keyPair = sodium.crypto_box_keypair();
  const publicKey = sodium.to_base64(keyPair.publicKey, sodium.base64_variants.ORIGINAL);
  const privateKey = sodium.to_base64(keyPair.privateKey, sodium.base64_variants.ORIGINAL);
  console.log('Public Key:', publicKey);
  console.log('Private Key:', privateKey);
};

generateKeyPair();