import { vi } from "vitest";

vi.mock("@tauri-apps/plugin-notification", async (importOriginal) => {
  const actual = (await importOriginal()) as unknown as object;
  return {
    ...actual,
    sendNotification: vi.fn(),
  };
});

vi.mock("@tauri-apps/api/path", async (importOriginal) => {
  const actual = (await importOriginal()) as unknown as object;
  return {
    ...actual,
    resolve: vi.fn(),
  };
});

vi.mock("@tauri-apps/plugin-fs", async (importOriginal) => {
  const actual = (await importOriginal()) as unknown as object;
  return {
    ...actual,
    exists: vi.fn(),
    readTextFile: vi.fn(() => "[]"),
  };
});
