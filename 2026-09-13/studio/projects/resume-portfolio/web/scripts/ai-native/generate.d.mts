/* generate.mjs 的类型声明（tsc --noEmit 用；实现见同名 .mjs） */
export function aiNativePlugin(): import("vite").Plugin;
export function buildAllFiles(): {
  files: Record<string, string>;
  jsonLd: Record<string, unknown>;
  projects: Record<string, unknown>[];
};
