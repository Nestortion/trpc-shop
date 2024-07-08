import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trpc } from "./utils/trpc.ts";
import { ClerkProvider } from "@clerk/clerk-react";
const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",

      //     "Content-Type": "application/json",
      //   };
      // },
    }),
  ],
});

const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_KEY) {
  throw new Error("Clerk key not found");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={CLERK_KEY}>
          <App />
        </ClerkProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
