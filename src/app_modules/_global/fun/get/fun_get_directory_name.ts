import { DIRECTORY_ID } from "@/app/lib";

export async function funGetDirectoryNameByValue({
  value,
}: {
  value?: string | null;
}) {
  if (!value) return null;
  const object: any = DIRECTORY_ID;
  return Object.keys(object).find((key) => object[key] === value);
}
