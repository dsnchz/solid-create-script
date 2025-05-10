<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=solid-create-script" alt="solid-create-script">
</p>

[![NPM Version](https://img.shields.io/npm/v/solid-create-script.svg?style=for-the-badge)](https://www.npmjs.com/package/solid-create-script) [![Build Status](https://img.shields.io/github/actions/workflow/status/thedanchez/solid-create-script/ci.yaml?branch=main&logo=github&style=for-the-badge)](https://github.com/thedanchez/solid-create-script/actions/workflows/ci.yaml) [![bun](https://img.shields.io/badge/maintained%20with-bun-cc00ff.svg?style=for-the-badge&logo=bun)](https://bun.sh/)

# @dschz/solid-create-script

MIT Licensed

Utility function to dynamically load external scripts in both declarative and imperative styles within SolidJS.

## Installation

```bash
npm install solid-js @dschz/load-script @dschz/solid-create-script
pnpm install solid-js @dschz/load-script @dschz/solid-create-script
yarn install solid-js @dschz/load-script @dschz/solid-create-script
bun install solid-js @dschz/load-script @dschz/solid-create-script
```

> These are **peer dependencies**, so they must be installed manually:
>
> - `solid-js`
> - `@dschz/load-script`

## Summary

```ts
import createScript from "@dschz/solid-create-script";
```

## API Breakdown

### `createScript`

A lightweight wrapper around `loadScript` with `createResource` that returns a `Resource<HTMLScriptElement>`.

The interface signature is as follows:

```ts
const createScript = (src: string, options?: LoadScriptOptions, container?: HTMLElement | null)
```

The three arguments:

- `src`: the script source to download
- `options`: the options to pass to `loadScript`
- `container`: the HTMLElement to append the `<script />` to.

It is useful for:

- Conditionally rendering based on script load status
- Tracking `loading`, `error`, and ready states

### Usage

```ts
import { Switch, Match } from "solid-js"
import createScript from "@dschz/solid-create-script"

const CustomComponent = () => {
  const script = createScript("https://example.com/library.js", { async: true });

  return (
    <Switch>
      <Match when={script.loading}>Loading Script...</Match>
      <Match when={script.error}>Failed to load</Match>
      <Match when={script()}>Script is ready!</Match>
    </Switch>
  )
}

```

> ⚠️ The `<script>` that is downloaded with `createScript` will be appended to `<head>`. This API currently does not support specifying a mount target for the `<script>` tag.

## Notes

- Scripts are automatically cached to prevent duplication.
- The script is not removed on cleanup/unmount.
- `createScript` uses `createResource` internally to manage async state.

## Feedback

Feel free to post issues or suggestions to help improve this library.
