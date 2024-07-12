import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_layout")({
  component: () => (
    <div>
      Layout
      {/* TODO: Add a header here */}
      <Header />
      <Outlet />
      <Footer />
      {/* TODO: Add a footer here */}
    </div>
  ),
});
