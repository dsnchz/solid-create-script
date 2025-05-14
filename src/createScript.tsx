import { loadScript, type LoadScriptOptions } from "@dschz/load-script";
import { createResource, type Resource } from "solid-js";

/**
 * A SolidJS utility hook that loads a script as a `Resource`.
 *
 * This is the high-level version of `loadScript`, wrapped in `createResource`.
 * It is ideal for declarative use-cases where you want to conditionally show UI
 * based on the script's `loading`, `error`, or `state`.
 *
 * Like `loadScript`, this function is safe from duplicate injection due to caching by `src`.
 *
 * @example
 * ```ts
 * const script = createScript("https://example.com/charting.js", { async: true });
 *
 * return (
 *   <Switch>
 *     <Match when={script.loading}>Loading Charting Library...</Match>
 *     <Match when={script.error}>Failed to load script</Match>
 *     <Match when={script()}>Chart library ready!</Match>
 *   </Switch>
 * );
 * ```
 *
 * @param src - The script URL to load.
 * @param options - HTML script attributes (e.g. async, type, innerHTML).
 * @param container - The HTMLElement to append the `<script />` to (defaults to `document.head`).
 * @returns `Resource<HTMLScriptElement>`
 */
export const createScript = (
  src: string,
  options: LoadScriptOptions = {},
  container?: HTMLElement | null,
): Resource<HTMLScriptElement> => {
  const [script] = createResource(() => loadScript(src, options, container));
  return script;
};
