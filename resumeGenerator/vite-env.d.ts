/// <reference types="vite/client" />

// @rollup/plugin-yaml が *.yaml を default export のオブジェクトとして解決する。
// 形は src/types.ts の Resume にキャストして扱う。
declare module '*.yaml' {
  const data: unknown
  export default data
}
