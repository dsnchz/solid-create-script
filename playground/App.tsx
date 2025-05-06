import { createScript } from "../src";

export const App = () => {
  const script = createScript("https://cdn.plaid.com/link/v2/stable/link-initialize.js", {
    defer: true,
  });

  return (
    <div>
      <div>Playground: solid-create-script</div>
      <div>Script Loading: {script.loading.toString()}</div>
    </div>
  );
};
