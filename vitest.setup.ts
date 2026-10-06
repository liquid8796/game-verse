import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/font/google", () => ({
  Barlow_Condensed: () => ({ variable: "font-display" }),
  Manrope: () => ({ variable: "font-body" }),
}));
