import { createFileRoute } from "@tanstack/react-router";
import { THEME_PHOTOS, buildThemeZip } from "../../lib/shopify-theme";

export const Route = createFileRoute("/api/shopify-theme-zip")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const photos: Record<string, Uint8Array> = {};
          await Promise.all(
            Object.entries(THEME_PHOTOS).map(async ([path, src]) => {
              const response = await fetch(new URL(src, request.url));
              if (!response.ok) throw new Error(`Photo ${src} answered ${response.status}`);
              photos[path] = new Uint8Array(await response.arrayBuffer());
            }),
          );
          const zip = buildThemeZip(photos);
          return new Response(zip as unknown as BodyInit, {
            headers: {
              "content-type": "application/zip",
              "content-disposition": 'attachment; filename="primalora-shopify-theme.zip"',
              "content-length": String(zip.length),
              "cache-control": "no-store",
            },
          });
        } catch {
          return new Response("The theme photos could not be gathered for the ZIP. Please try again.", {
            status: 502,
            headers: { "content-type": "text/plain; charset=utf-8" },
          });
        }
      },
    },
  },
});
