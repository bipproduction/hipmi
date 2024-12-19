export async function apiGetMasterCollaboration() {
  const data = await fetch(`/api/collaboration/master`);
  return await data.json().catch(() => null);
}
