// Fetch helpers untuk bridge Google auth → session HIPMI.

export type GoogleLinkResult =
  | { success: true; status: "LINKED" | "REGISTERED" }
  | { success: true; status: "NEED_USERNAME" }
  | { success: true; status: "CONFIRM_OVERRIDE"; existingEmailMasked: string }
  | { success: false; message: string };

// POST /api/auth/google-link — link / override / register via nomor HP.
export async function apiFetch_googleLink(body: {
  nomor: string;
  email: string;
  username?: string;
  confirmOverride?: boolean;
}): Promise<GoogleLinkResult> {
  const res = await fetch("/api/auth/google-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}
