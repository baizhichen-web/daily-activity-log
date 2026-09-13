/// <reference types="vite/client" />

/* mini-yaml 解析器（scripts/ai-native/mini-yaml.mjs）的 TS 侧声明：
   渲染侧（src/lib/content.ts）与构建侧（generate.mjs）共用同一实现 */
declare module "*.mjs" {
  export function parseMiniYaml(src: string): unknown;
}
