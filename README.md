<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=solid-create-script" alt="solid-create-script">
</p>

[![NPM Version](https://img.shields.io/npm/v/@dschz/solid-create-script.svg?style=for-the-badge)](https://www.npmjs.com/package/@dschz/solid-create-script)
[![Build Status](https://img.shields.io/github/actions/workflow/status/dsnchz/solid-create-script/ci.yaml?branch=main&logo=github&style=for-the-badge)](https://github.com/dsnchz/solid-create-script/actions/workflows/ci.yaml)
[![TypeScript](https://img.shields.io/badge/TypeScript-supported-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SSR Compatible](https://img.shields.io/badge/SSR-compatible-brightgreen?style=for-the-badge)](#)

# @dschz/solid-create-script

> SolidJS hook to load external scripts -- built on top of [`@dschz/load-script`](https://www.npmjs.com/package/@dschz/load-script).

## ✅ Features

- 📑 Fully typed with TypeScript
- ✏️ Built on top of [`@dschz/load-script`](https://www.npmjs.com/package/@dschz/load-script) inheriting all the same features.
- 📆 Declarative async tracking via Solid's `createResource`

## 📦 Installation

```bash
npm install solid-js @dschz/load-script @dschz/solid-create-script
pnpm install solid-js @dschz/load-script @dschz/solid-create-script
yarn install solid-js @dschz/load-script @dschz/solid-create-script
bun install solid-js @dschz/load-script @dschz/solid-create-script
```

> These are **peer dependencies**, so you must install:
>
> - `solid-js`
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
