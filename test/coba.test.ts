import { prisma } from "@/lib";
import { describe, test, expect } from "bun:test";

describe("coba test", () => {
  test("coba", async () => {
    const user = await prisma.user.findMany();
    expect(user).not.toBeEmpty();
  });
});
