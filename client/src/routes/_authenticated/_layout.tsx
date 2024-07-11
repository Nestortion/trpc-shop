import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => (
    <div>
      Layout
      <Outlet />
    </div>
  ),
});
