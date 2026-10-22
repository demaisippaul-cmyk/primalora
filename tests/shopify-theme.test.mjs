import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { zipSync, unzipSync, strToU8, strFromU8 } from "fflate";

const files = JSON.parse(readFileSync(new URL("../src/lib/shopify-theme.json", import.meta.url), "utf8"));
const photos = ["model", "noir", "cluster", "pearl"].map((k) => `assets/primalora-${k}.webp`);

test("Shopify theme ZIP is complete and self-consistent", () => {
  const entries = {};
  for (const [path, text] of Object.entries(files)) entries[path] = strToU8(text);
  for (const path of photos) entries[path] = strToU8("RIFF....WEBP");
  const unzipped = unzipSync(zipSync(entries, { level: 6 }));
  const names = Object.keys(unzipped);
  for (const dir of ["layout", "templates", "sections", "config", "locales", "snippets", "assets"]) {
    assert.ok(names.some((n) => n.startsWith(`${dir}/`)), dir);
  }
  const layout = strFromU8(unzipped["layout/theme.liquid"]);
  assert.match(layout, /content_for_header/);
  assert.match(layout, /content_for_layout/);
  const sections = new Set(names.filter((n) => /^sections\/.+\.liquid$/.test(n)).map((n) => n.slice(9, -7)));
  for (const name of names) {
    const text = strFromU8(unzipped[name]);
    if (name.endsWith(".json")) {
      const json = JSON.parse(text);
      if (/^(templates|sections)\//.test(name)) {
        for (const s of Object.values(json.sections)) assert.ok(sections.has(s.type), `${name} -> ${s.type}`);
        assert.deepEqual([...json.order].sort(), Object.keys(json.sections).sort());
      }
    }
    if (name.endsWith(".liquid")) {
      for (const [, r] of text.matchAll(/render '([\w-]+)'/g)) assert.ok(names.includes(`snippets/${r}.liquid`), r);
      for (const [, a] of text.matchAll(/'([\w.-]+)' \| asset_url/g)) assert.ok(names.includes(`assets/${a}`), a);
      const schema = text.match(/{% schema %}([\s\S]*){% endschema %}/);
      if (schema) JSON.parse(schema[1]);
      assert.doesNotMatch(text, /foundable/i, name);
    }
  }
  const photo = strFromU8(unzipped["snippets/photo.liquid"]);
  for (const p of photos) assert.ok(photo.includes(p.slice(7)), p);
  assert.match(photo, /section\.settings\[key\]/);
});
