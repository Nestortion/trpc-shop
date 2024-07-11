import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: () => (
    <div>
      Authenticated page
      <Outlet />
    </div>
  ),
});
