import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "../site/chrome";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "The Collection — Primalora" },
    { name: "description", content: "Browse the Primalora jewelry collection." },
  ] }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <Header />
      <main className="shop">
        <p className="eyebrow-gold">The Collection</p>
        <h1>Primalora</h1>
        <span className="bar center" />
        <div className="shop-empty">
          <svg width="48" height="48" viewBox="0 0 34 34" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.8">
            <circle cx="17" cy="17" r="16" />
            <path d="M17 8c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z" />
          </svg>
          <h2>The collection is being prepared</h2>
          <p>Pieces will appear here soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
