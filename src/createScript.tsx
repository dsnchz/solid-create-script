import { createResource, type JSX, mergeProps, splitProps, untrack } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";

import type { FetchPriority, ReferrerPolicy, ScriptType } from "./types";

type ScriptAttributes = Omit<
  JSX.ScriptHTMLAttributes<HTMLScriptElement>,
  "src" | "referrerPolicy" | "fetchpriority" | "type"
> & {
  referrerPolicy?: ReferrerPolicy;
  fetchPriority?: FetchPriority;
  type?: ScriptType;
};

type ScriptEvent = Event & {
  currentTarget: HTMLScriptElement;
  target: DOMElement;
};

type DirectScriptAttributes = Pick<
  ScriptAttributes,
  | "async"
  | "defer"
  | "innerHTML"
  | "fetchPriority"
  | "noModule"
  | "type"
  | "crossOrigin"
  | "referrerPolicy"
  | "integrity"
  | "nonce"
>;

const DIRECT_SCRIPT_ATTRIBUTES = [
  "async",
  "defer",
  "innerHTML",
  "fetchPriority",
  "noModule",
  "type",
  "crossOrigin",
  "referrerPolicy",
  "integrity",
  "nonce",
] as Readonly<(keyof DirectScriptAttributes)[]>;

// Promise cache for script sources
const SCRIPT_PROMISES = new Map<string, Promise<Event>>();

const loadScript = async (src: string, attributes: Readonly<ScriptAttributes>) => {
  const _attributes = mergeProps(
    {
      async: true,
      defer: false,
      innerHTML: "",
      fetchPriority: "auto" as FetchPriority,
    },
    attributes,
  );

  const [initEvents, otherAttributes] = splitProps(_attributes, [
    "onload",
    "onLoad",
    "onerror",
    "onError",
  ]);
  const [directAttributes, restAttributes] = splitProps(otherAttributes, DIRECT_SCRIPT_ATTRIBUTES);

  // 1. Reject if no src provided
  if (!src) return Promise.reject(new Error('No "src" provided for createScript'));

  // 2. Return cached promise if referencing same src
  if (SCRIPT_PROMISES.has(src)) return SCRIPT_PROMISES.get(src)!;

  // 3. Check if script already exists (may have been added externally not via this hook)
  if (document.querySelector(`script[src="${src}"]`))
    return Promise.resolve(new Event("already-loaded"));

  // 4. Create new script element
  const promise = new Promise<Event>((resolve, reject) => {
    const script = document.createElement("script");

    script.src = src;
    script.async = untrack(() => directAttributes.async);
    script.defer = untrack(() => directAttributes.defer);
    script.innerHTML = untrack(() => directAttributes.innerHTML);
    script.fetchPriority = untrack(() => directAttributes.fetchPriority);

    const type = untrack(() => directAttributes.type);
    if (type) script.type = type;

    const crossOrigin = untrack(() => directAttributes.crossOrigin);
    if (crossOrigin) script.crossOrigin = crossOrigin;

    const referrerPolicy = untrack(() => directAttributes.referrerPolicy);
    if (referrerPolicy) script.referrerPolicy = referrerPolicy;

    const integrity = untrack(() => directAttributes.integrity);
    if (integrity) script.integrity = integrity;

    const nonce = untrack(() => directAttributes.nonce);
    if (nonce) script.nonce = nonce;

    const noModule = untrack(() => directAttributes.noModule);
    if (noModule) script.noModule = noModule;

    script.onload = (e) => {
      if (typeof initEvents.onload === "function") {
        initEvents.onload(e as ScriptEvent);
      } else if (typeof initEvents.onLoad === "function") {
        initEvents.onLoad(e as ScriptEvent);
      }

      resolve(e);
    };

    script.onerror = (e) => {
      const event = typeof e === "string" ? new Error(e) : e;
      const errorEvent = event as ErrorEvent & {
        currentTarget: HTMLScriptElement;
        target: Element;
      };

      if (typeof initEvents.onerror === "function") {
        initEvents.onerror(errorEvent);
      } else if (typeof initEvents.onError === "function") {
        initEvents.onError(errorEvent);
      }

      reject(e);
    };

    // Apply additional attributes if any
    Object.entries(restAttributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    document.head.appendChild(script);
  });

  SCRIPT_PROMISES.set(src, promise);
  return promise;
};

const createScript = (src: string, attributes: Readonly<ScriptAttributes> = {}) => {
  const [script] = createResource(() => loadScript(src, attributes));
  return script;
};

export default createScript;
