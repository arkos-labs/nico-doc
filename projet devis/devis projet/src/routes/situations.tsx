import { createFileRoute, redirect } from "@tanstack/react-router";

// Situations BTP supprimées — redirection vers le dashboard
export const Route = createFileRoute("/situations")({
  beforeLoad: () => {
    throw redirect({ to: "/tableau-de-bord", replace: true });
  },
  component: () => null,
});
