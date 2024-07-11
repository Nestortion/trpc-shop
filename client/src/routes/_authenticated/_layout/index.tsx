import { SignInButton, UserProfile } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../../utils/trpc";

export const Route = createFileRoute("/_authenticated/_layout/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  const products = trpc.products.getAll.useQuery();

  return (
    <div>
      <UserProfile />
      <SignInButton />
    </div>
  );
}
