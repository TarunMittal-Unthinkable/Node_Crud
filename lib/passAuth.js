import sodium from "libsodium-wrappers";

export const handleDecryptPassword = async (encryptedPassword, nonce) => {
  await sodium.ready;
  const privateKeyUint8Array = sodium.from_base64(process.env.PASSWORD_DECRYPTION_PRIVATE_KEY, sodium.base64_variants.ORIGINAL);
  const publicKeyUint8Array = sodium.from_base64(process.env.PASSWORD_DECRYPTION_PUBLIC_KEY, sodium.base64_variants.ORIGINAL);
  const nonceBuffer = sodium.from_base64(nonce, sodium.base64_variants.ORIGINAL);
  const encryptedBuffer = sodium.from_base64(encryptedPassword, sodium.base64_variants.ORIGINAL);

  const decrypted = sodium.crypto_box_open_easy(encryptedBuffer, nonceBuffer, publicKeyUint8Array, privateKeyUint8Array);
  return sodium.to_string(decrypted);
};