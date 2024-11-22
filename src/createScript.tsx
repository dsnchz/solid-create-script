import { createResource, type JSX, splitProps } from "solid-js";
import type { DOMElement } from "solid-js/jsx-runtime";

type ScriptAttributes = Omit<JSX.ScriptHTMLAttributes<HTMLScriptElement>, "src">;

type ScriptEvent = Event & {
  currentTarget: HTMLScriptElement;
  target: DOMElement;
};

// Promise cache for script sources
const SCRIPT_PROMISES = new Map<string, Promise<Event>>();

const loadScript = async (src: string, attributes: Readonly<ScriptAttributes>) => {
  const [initEvents, otherAttributes] = splitProps(attributes, ["onload", "onLoad", "onerror", "onError"]);

  // 1. Reject if no src provided
  if (!src) return Promise.reject(new Error('No "src" provided for createScript'));

  // 2. Return cached promise if referencing same src
  if (SCRIPT_PROMISES.has(src)) return SCRIPT_PROMISES.get(src)!;

  // 3. Check if script already exists (may have been added externally not via this hook)
  if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve(new Event("already-loaded"));

  // 4. Create new script element
  const promise = new Promise<Event>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = (e) => {
      if (typeof initEvents.onload === "function") {
        initEvents.onload(e as ScriptEvent);
      } else if (typeof initEvents.onLoad === "function") {
        initEvents.onLoad(e as ScriptEvent);
      }

      resolve(e);
    };

    script.onerror = (e) => {
      if (typeof initEvents.onerror === "function") {
        initEvents.onerror(e as ScriptEvent);
      } else if (typeof initEvents.onError === "function") {
        initEvents.onError(e as ScriptEvent);
      }

      reject(e);
    };

    // Apply additional attributes if any
    Object.entries(otherAttributes).forEach(([key, value]) => {
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
