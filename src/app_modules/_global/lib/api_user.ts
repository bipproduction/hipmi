export const apiGetCookiesUser = async () => {
  const response = await fetch(`/api/user/get`);
  return await response.json().catch(() => null);
};

export const apiGetACtivationUser = async () => {
  const response = await fetch(`/api/user/activation`);
  return await response.json().catch(() => null);
};