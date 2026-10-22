import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { startFoundation } from "../foundation";
import { Home } from "../site/home";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  // The foundation's dialog, menu and inquiry-form helpers (src/foundation.ts), started once this page is mounted.
  useEffect(() => startFoundation(), []);
  return <Home />;
}
