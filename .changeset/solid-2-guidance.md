---
"@dschz/solid-create-script": patch
---

SolidJS 1.x only: the `solid-js` peer range is now `>=1.6.0 <2.0.0`. `createScript` is built on `createResource`, which SolidJS 2.0 removed, so on 2.0 the package failed at import while the old `>=1.6.0` range let it install without a warning. On SolidJS 2.0, use `@dschz/load-script` directly with `createMemo`, `<Loading>` and `<Errored>`; the README shows the pattern.
