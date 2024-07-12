import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { trpc } from "./utils/trpc.ts";
import { routeTree } from "../src/routeTree.gen.ts";

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Clerk key not found");
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_KEY}>
      <ProvidersWrapper />
    </ClerkProvider>
  </React.StrictMode>
);

function ProvidersWrapper() {
  const auth = useAuth();
  const queryClient = new QueryClient();

  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
        headers: async () => {
          const token = await auth.getToken();
          return {
            authorization: `Bearer ${token}`,
          };
        },
      }),
    ],
  });

  const router = createRouter({
    routeTree,
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
