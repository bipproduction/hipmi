import { afterEach, describe, expect, mock, test } from "bun:test";

// Regresi bug: `res.json()` melempar SyntaxError saat server WA membalas
// plain text ("Unknown subdomain"), sehingga update user yang sudah sukses
// keliru dilaporkan gagal (500). Notifikasi WA harus best-effort → tetap 200.

const updateMock = mock(async () => ({ id: "u1", active: true }));

mock.module("@/lib/prisma", () => ({
  default: { user: { update: updateMock } },
}));

mock.module("@/util/backendLogger", () => ({
  default: { info: () => {}, error: () => {}, warn: () => {}, log: () => {} },
}));

mock.module("next/cache", () => ({ revalidatePath: () => {} }));

mock.module("next/headers", () => ({
  headers: () => ({
    get: (k: string) =>
      k === "host" ? "app.example.com" : k === "x-forwarded-proto" ? "https" : null,
  }),
}));

// Import setelah semua modul di-mock (bun meng-hoist mock.module di atas).
import adminUserAccess_funEditAccess from "@/app_modules/admin/user-access/fun/edit/fun_edit_access";

const realFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = realFetch;
  updateMock.mockClear();
});

describe("adminUserAccess_funEditAccess", () => {
  test("tetap 200 saat server WA membalas plain text non-JSON (non-ok)", async () => {
    globalThis.fetch = mock(async () =>
      new Response("Unknown subdomain", { status: 400 })
    ) as unknown as typeof fetch;

    const res = await adminUserAccess_funEditAccess("u1", true, "628123");

    expect(res.status).toBe(200);
    expect(updateMock).toHaveBeenCalledTimes(1);
  });

  test("tetap 200 saat fetch WA melempar error jaringan", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("network down");
    }) as unknown as typeof fetch;

    const res = await adminUserAccess_funEditAccess("u1", true, "628123");

    expect(res.status).toBe(200);
  });

  test("tidak memanggil WA saat value=false", async () => {
    const fetchSpy = mock(async () => new Response("ok", { status: 200 }));
    globalThis.fetch = fetchSpy as unknown as typeof fetch;

    const res = await adminUserAccess_funEditAccess("u1", false);

    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
