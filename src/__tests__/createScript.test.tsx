import { waitFor } from "@solidjs/testing-library";
import { createRoot } from "solid-js";
import { beforeEach, describe, expect, test } from "vitest";

import { createScript } from "../createScript";

const SCRIPT_SRC = "https://example.com/script.js";

describe("createScript", () => {
  beforeEach(() => {
    document.querySelectorAll("script").forEach((s) => s.remove());
  });

  test("returns a SolidJS resource that resolves when the script loads", async () => {
    await createRoot(async (dispose) => {
      const scriptResource = createScript(SCRIPT_SRC);

      const el = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      expect(el).toBeDefined();

      el?.dispatchEvent(new Event("load"));

      await waitFor(() => {
        expect(scriptResource()).toBeInstanceOf(HTMLScriptElement);
      });

      expect(scriptResource!.loading).toBe(false);
      expect(scriptResource!.error).toBeUndefined();

      dispose();
    });
  });
});
