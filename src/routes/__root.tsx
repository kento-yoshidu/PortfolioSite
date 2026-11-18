import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";

import "../css/global.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ title: "Kento Yoshizu Portfolio Site" }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  );
}
