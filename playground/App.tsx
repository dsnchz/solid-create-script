import { Match, Switch } from "solid-js";

import { createScript } from "../src";

declare global {
  interface Window {
    google: unknown;
  }
}

export const App = () => {
  const googleScript = createScript("https://www.gstatic.com/charts/loader.js", {
    async: true,
    type: "text/javascript",
    onLoad: () => console.log("Google Charts loaded"),
    onError: (e) => console.error("Google Charts failed", e),
  });

  return (
    <div style={{ padding: "2rem", "font-family": "sans-serif" }}>
      <h1>solid-create-script Demo</h1>

      <section style={{ "margin-top": "1.5rem" }}>
        <h2>createScript (Google Charts)</h2>
        <Switch>
          <Match when={googleScript.loading}>Loading Google Charts…</Match>
          <Match when={googleScript.error}>❌ Failed to load Google Charts</Match>
          <Match when={googleScript()}>
            ✅ Script loaded. `google` is{" "}
            {typeof window.google !== "undefined" ? "defined" : "undefined"}.
          </Match>
        </Switch>
      </section>
    </div>
  );
};
