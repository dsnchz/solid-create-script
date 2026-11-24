<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=solid-create-script" alt="solid-create-script">
</p>

# @dschz/solid-create-script

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm](https://img.shields.io/npm/v/@dschz/solid-create-script)](https://www.npmjs.com/package/@dschz/solid-create-script)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dschz/solid-create-script)](https://bundlephobia.com/package/@dschz/solid-create-script)
[![JSR](https://jsr.io/badges/@dschz/solid-create-script/score)](https://jsr.io/@dschz/solid-create-script)
[![CI](https://github.com/dsnchz/solid-create-script/actions/workflows/ci.yaml/badge.svg)](https://github.com/dsnchz/solid-create-script/actions/workflows/ci.yaml)

> SolidJS 1.x hook to load external scripts -- built on top of [`@dschz/load-script`](https://www.npmjs.com/package/@dschz/load-script).

## ⚠️ Using SolidJS 2.0? You don't need this package

This package wraps `loadScript` in `createResource`, which SolidJS 2.0 removed. In 2.0, async values are part of the reactive graph: a computation can return a promise, a `<Loading>` boundary shows its fallback until the promise resolves, and an `<Errored>` boundary catches a rejection. So use [`@dschz/load-script`](https://www.npmjs.com/package/@dschz/load-script) directly:

```bash
npm install @dschz/load-script
```

```tsx
import { loadScript } from "@dschz/load-script";
import { createMemo, Errored, Loading, Show } from "solid-js";

const CustomComponent = () => {
  // Resolves to the <script> element once it has loaded (cached by `src`).
  const script = createMemo(() => loadScript("https://example.com/widget.js", { async: true }));

  return (
    <Errored fallback={<p>Failed to load</p>}>
      <Loading fallback={<p>Loading Script...</p>}>
        <Show when={script()}>Script is ready!</Show>
      </Loading>
    </Errored>
  );
};
```

| SolidJS 1.x (`createScript`) | SolidJS 2.0 (`loadScript` + primitives)      |
| ---------------------------- | -------------------------------------------- |
| `createScript(src, options)` | `createMemo(() => loadScript(src, options))` |
| `script.loading`             | `<Loading fallback={…}>` around the reads    |
| `script.error`               | `<Errored fallback={…}>` around the reads    |
| `script()` once loaded       | `script()` inside the boundaries             |

`loadScript` rejects on the server, so in a server-rendered app load the script on the client only (for example, a component rendered client-side).

This package stays available for SolidJS 1.x (1.6 or newer) and is not updated for 2.0.

## ✅ Features (SolidJS 1.x)

- 📑 Fully typed with TypeScript
- ✏️ Built on top of [`@dschz/load-script`](https://www.npmjs.com/package/@dschz/load-script) inheriting all the same features.
- 📆 Declarative async tracking via Solid's `createResource`

## 📦 Installation (SolidJS 1.x)

```bash
npm install solid-js@1 @dschz/load-script @dschz/solid-create-script
pnpm add solid-js@1 @dschz/load-script @dschz/solid-create-script
yarn add solid-js@1 @dschz/load-script @dschz/solid-create-script
bun add solid-js@1 @dschz/load-script @dschz/solid-create-script
```

> These are **peer dependencies**, so you must install:
>
> - `solid-js` 1.6 or newer, below 2.0
> - `@dschz/load-script`

## 🧠 API

### `createScript(src, options?, container?)`

Loads an external script dynamically and returns a `Resource<HTMLScriptElement>`.

#### Parameters:

| Name        | Type                | Description                                                       |
| ----------- | ------------------- | ----------------------------------------------------------------- |
| `src`       | `string`            | Script URL (required)                                             |
| `options`   | `LoadScriptOptions` | `loadScript` options (e.g. `async`, `type`)                       |
| `container` | `HTMLElement`       | HTML element to append `<script />` to (default: `document.head`) |

## 🧪 Example

```ts
import { Switch, Match } from "solid-js";
import { createScript } from "@dschz/solid-create-script";

const CustomComponent = () => {
  const script = createScript("https://example.com/widget.js", { async: true });

  return (
    <Switch>
      <Match when={script.loading}>Loading Script...</Match>
      <Match when={script.error}>Failed to load</Match>
      <Match when={script()}>Script is ready!</Match>
    </Switch>
  );
};
```

## 📝 Notes

- Scripts are cached by `src` unless `innerHTML` or `textContent` is used
- Scripts are not automatically removed on cleanup/unmount
- Designed to be simple and safe to use inside SolidJS components (in SSR and non-SSR environments)

## 💬 Feedback & Contributions

Feel free to open [issues](https://github.com/dsnchz/solid-create-script/issues) or submit pull requests. PRs are welcome!
