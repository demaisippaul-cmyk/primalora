import { createFileRoute } from "@tanstack/react-router";
import { Footer, Header } from "../site/chrome";

export const Route = createFileRoute("/shopify-export")({
  head: () => ({ meta: [
    { title: "Shopify export — Primalora" },
    { name: "description", content: "Download the Primalora Shopify theme ZIP." },
    { name: "robots", content: "noindex" },
  ] }),
  component: ShopifyExport,
});

function ShopifyExport() {
  return (
    <>
      <Header />
      <main className="size-help">
        <div className="size-help-inner" style={{ textAlign: "center" }}>
          <p className="eyebrow-gold">Owner tools</p>
          <h1>Shopify theme</h1>
          <span className="bar center" />
          <p>
            A Liquid theme for Shopify with the Primalora home page, photographs, product, collection and cart pages,
            contact form and size help. Upload it in Shopify under Online Store → Themes → Add theme → Upload zip file.
          </p>
          <p style={{ marginTop: "2.5rem" }}>
            <a className="shop-button" href="/api/shopify-theme-zip" download="primalora-shopify-theme.zip" id="download-theme">
              Download Shopify theme ZIP
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
