import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <div className="w-screen flex justify-center h-screen items-center">
      <SignIn />
    </div>
  );
}
