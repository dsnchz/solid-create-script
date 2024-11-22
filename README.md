<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=solid-create-script" alt="solid-create-script">
</p>

[![NPM Version](https://img.shields.io/npm/v/solid-create-script.svg?style=for-the-badge)](https://www.npmjs.com/package/solid-create-script) [![Build Status](https://img.shields.io/github/actions/workflow/status/thedanchez/solid-create-script/ci.yaml?branch=main&logo=github&style=for-the-badge)](https://github.com/thedanchez/solid-create-script/actions/workflows/ci.yaml) [![bun](https://img.shields.io/badge/maintained%20with-bun-cc00ff.svg?style=for-the-badge&logo=bun)](https://bun.sh/)

# solid-create-script

Solid utility hook to dynamically load an external script.

### Installation

```bash
npm install solid-js solid-create-script
pnpm add solid-js solid-create-script
yarn add solid-js solid-create-script
bun add solid-js solid-create-script
```

### Usage

```tsx
const script = createScript("https://some-library.js");
const script = createScript("https://some-library.js", { async: true, ...scriptAttributes });
const script = createScript("https://some-library.js", { defer: true, ...scriptAttributes });
```

Under the hood `createScript` makes use of the `createResource` Solid API when loading the desired script at the specified `src`. As such, the result of `createScript` is a `Resource<Event>` object that allows you to inspect when the script has finished loading or returned an error via `script.loading` and `script.error` respectively.

When using `createScript`, here are some points to be aware of:

- The created `<script>` tag will be appeneded to `<head>`.
- The created `<script>` tag will not be removed from the DOM when a component that uses this hook unmounts. (i.e. we do not make use of `onCleanup` to remove the `<script>` from `<head>`).
- The hook will ensure no duplicate `<script>` tags referencing the same `src` will be created. Moreover, when multiple components reference the same `src`, they will all point to the same shared resource ensuring consistency within the reactive graph.

### Full Example

```tsx
import { Switch, Match } from "solid-js";
import { createScript } from "solid-create-script";

function App() {
  const script = createScript("https://some-library.js");

  return (
    <Switch fallback={<ScriptProvider>...</ScriptProvider>}>
      <Match when={script.loading}>Loading Script...</Match>
      <Match when={script.error}>Failed to load script: {script.error.message}</Match>
    </Switch>
  );
}
```

### Feedback

Feel free to post any issues or suggestions to help improve this utility hook.
