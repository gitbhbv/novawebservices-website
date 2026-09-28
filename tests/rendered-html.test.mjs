import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the one-page sections in the approved order", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("sections", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  const renderedText = html.replaceAll("<!-- -->", "");
  const markers = [
    'id="home"',
    'id="why-nova"',
    'id="work"',
    'id="packages"',
    'id="maintenance"',
    'id="faq"',
    'id="get-started"',
  ];
  const positions = markers.map((marker) => html.indexOf(marker));

  assert.ok(positions.every((position) => position >= 0), "all one-page sections should render");
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.match(html, /Super Nova/);
  assert.match(renderedText, /Essential ✨/);
  assert.match(renderedText, /Pro ⚡/);
  assert.match(renderedText, /Ultimate 💎/);
  assert.match(renderedText, /Super Nova ☄️/);
  assert.match(html, /Made by NOVA Web Services/);
  assert.match(html, /href="\/#why-nova">About</);
  assert.match(html, /class="price-card" data-reveal="true"/);
  assert.doesNotMatch(html, /data-reveal="center"/);
  assert.match(html, /Complete website plus standard third-party integrations\./);
  assert.doesNotMatch(html, /reasonable standard third-party integrations/);
  assert.match(html, /Save &amp; Continue to Questionnaire/);
  assert.match(html, /best guess, not a binding choice/);
  assert.match(html, /For requests that materially change the website\./);
  assert.doesNotMatch(html, /The NOVA standard/);
  assert.doesNotMatch(html, /Beyond the standard packages/);
  assert.doesNotMatch(html, /nova-supernova-logo/);
  assert.match(html, /Privacy Policy/);
  assert.match(html, /Terms of Service/);
  assert.match(html, /Prefer to make routine content updates yourself\? Ask about a CMS setup\./);
});

test("accepts the three-field intake and carries the package preference", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("intake", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  let sentMessage;

  const response = await worker.fetch(
    new Request("http://localhost/api/project-inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "NOVA Test",
        business: "Small Business",
        email: "test@example.com",
        selectedPackage: "Ultimate",
        companyWebsite: "",
        startedAt: Date.now() - 3000,
      }),
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      EMAIL: {
        send: async (message) => {
          sentMessage = message;
          return { messageId: "test-message" };
        },
      },
      PROJECT_INBOX: "inbox@example.com",
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(sentMessage?.text ?? "", /Package preference: Ultimate/);
});
