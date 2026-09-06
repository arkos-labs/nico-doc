import { createFileRoute, redirect } from "@tanstack/react-router";

// La landing Devizia est supprimée — redirection vers l'espace connexion
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/connexion", replace: true });
  },
  component: () => null,
});
