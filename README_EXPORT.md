# Vyuk website: independent hosting export

Exported on 6 November 2026 from the deployed website, version 65.

Source website: https://vyuk-v32-recreated.sujilssologinalllogi.chatgpt.site/

Source commit: `344f253550271366dbc1a72c79c3e96702c3f28d`.

The 182 original tracked files are preserved byte for byte, including all 35 public image assets. Additional files under `hosting/`, this guide and a GitHub Actions workflow provide an independent deployment path. `hosting/original-source-manifest.json` records the original file hashes.

## What is included

Version 65 includes the Formation mark in the headers, footer and favicon. The About section carries the heading “intelligence, in formation” and explains both Vyuh Yukthi and Vyapar Yukthi.

- All current and archived pages, React/TypeScript components, responsive CSS, design tokens, SVG/PNG/WebP images, walkthrough data and animations.
- The original `package.json`, pinned `pnpm-lock.yaml`, package-manager settings, TypeScript, Next.js, Vite/Vinext, Tailwind/PostCSS and Cloudflare build configuration.
- The original enquiry API, Drizzle schema and SQL migration.
- A GitHub Pages static-export script, deployment workflow and independent enquiry-worker implementation.
- A validation report in `hosting/VALIDATION.md`.

Dependencies are declared and locked; `node_modules` is intentionally not distributed. Install them using the pinned package manager. No credentials, production database records, private runtime variables or Git history are included.

## Pages and routing

| URL path | Purpose |
| --- | --- |
| `/` | Homepage, areas of focus, applied AI use cases, about and contact |
| `/work/conversational-analytics/` | Current conversational analytics case page and walkthrough |
| `/work/field-sales-throughput/` | Current field sales intelligence case page and walkthrough |
| `/privacy/` | Privacy Policy |
| `/terms/` | Terms of Use |
| `/archive/conversational-analytics/` | Previous conversational analytics page |
| `/archive/field-sales-throughput/` | Previous field sales page |
| `/review/conversational-analytics/` | Redirect to the current analytics page |
| `/review/field-sales-intelligence/` | Redirect to the current field sales page |
| `/api/discovery` | Original server-only POST endpoint; must run separately from GitHub Pages |

Next.js App Router uses the `app/` folder structure as its route configuration. Homepage sections such as About are anchors, not separate pages. The static build produces a real `index.html` for every page so opening or refreshing a nested URL works without an SPA rewrite rule.

## Run or build the original application

The original application is React 19.2.6 with the Next.js 16.3.4 API, executed by Vinext 1.0.0-beta.5, Vite 8.0.13 and Cloudflare Workers. Its existing `build` command produces a Worker application, not a GitHub Pages website.

Use Node.js 24 for the supplied workflow. The original package declares Node.js 22.13.0 or newer and pnpm 11.25.0.

```sh
npm install --global pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

For the original Worker build:

```sh
pnpm build
```

The default local Vite configuration uses a placeholder D1 binding. Apply `drizzle/0000_amused_bulldozer.sql` to a configured local database before expecting forms to store data locally. Copying the source does not copy or connect to the live database.

## Deploy the frontend to GitHub Pages

1. Create a GitHub repository with default branch `main`.
2. Extract this ZIP. Commit the **contents of `vyuk-website/`** to the repository root, including `.github/` and the original configuration files. Do not commit the ZIP itself, `node_modules`, `out`, `.next`, `.wrangler` or generated build output.
3. Open the repository's **Settings → Pages** and select **GitHub Actions** as the publishing source.
4. Deploy the enquiry service described below. In **Settings → Secrets and variables → Actions → Variables**, add the repository variable `DISCOVERY_API_URL`, containing its full endpoint, for example `https://vyuk-website-enquiries.YOUR_ACCOUNT.workers.dev/api/discovery`.
5. Push to `main`, or run **Deploy Vyuk to GitHub Pages** manually from the Actions tab. The workflow installs locked dependencies, obtains the actual Pages origin and path, builds, uploads `out/github-pages` and deploys it.

The supplied workflow uses GitHub's built-in deployment token. No ChatGPT token is needed. The form endpoint URL is public configuration, not a secret.

You can build the same static output locally:

```sh
node hosting/build-github-pages.mjs --base-path /YOUR_REPOSITORY --site-url https://YOUR_USERNAME.github.io --api-url https://YOUR_WORKER.workers.dev/api/discovery
```

For a user/organization Pages site or a custom domain, omit `--base-path`:

```sh
node hosting/build-github-pages.mjs --site-url https://www.your-domain.example --api-url https://YOUR_WORKER.workers.dev/api/discovery
```

Upload the contents of `out/github-pages/` to another static host if desired. A host must serve directory `index.html` files for nested pages. The generated `.nojekyll` keeps GitHub from treating `_next/` assets as Jekyll input.

The original application files remain intact. The script copies frontend source into `out/.pages-source/`, removes server-only code from that temporary copy, changes the form endpoint there, adjusts ordinary root-relative image and anchor URLs for the repository prefix, and invokes a Next.js static export. Page appearance, content, client interactions and image files are reused.

If `--api-url` or `DISCOVERY_API_URL` is absent, the pages still build. Submitting a form shows an honest configuration error directing the visitor to email Vyuk; it never claims an enquiry was saved. Direct email links continue to work.

## Preserve enquiry and demo-request submissions

GitHub Pages serves static files and cannot execute the current `/api/discovery` server route or provide its D1 database. A separate service is required for the contact form and the demo forms on both current case pages. Archive pages reuse the contact form.

`hosting/discovery-worker/worker.mjs` is an independent Cloudflare Worker that preserves the current JSON payload and table structure. It adds CORS support for the separately hosted frontend. Its setup guide is `hosting/discovery-worker/README.md`.

Create your own database, apply the included schema, set its binding ID and configure `SITE_ORIGIN` to the exact frontend origin. Then deploy that worker and provide its endpoint to the static build. No connection to the ChatGPT Sites control plane is needed.

This recreates the current submission behavior: save the enquiry and show confirmation. The original code does not send an email notification, run an AI query or deliver a live product demonstration. The walkthroughs are frontend demonstrations with local content. The replacement preserves that scope.

Existing enquiry records are **not** in this export. Migrate them separately if needed. The existing 12-month retention policy also requires an operational review/deletion process; source export does not transfer that process or automatically delete records.

## Hosting dependencies and differences

| Current dependency | What changes outside ChatGPT Sites |
| --- | --- |
| Sites' upstream access allowlist and sign-in gate | These controls belong to the host and do not travel with the code. The normal GitHub Pages deployment is public. Choose separate authentication if restricted access is required. |
| `.openai/hosting.json`, the Sites Vite plugin and managed publishing scripts | Preserved in the original source. The static-export path does not use the Sites deployment plugin, project registration or publishing helpers. |
| Cloudflare Worker request handling and `cloudflare:workers` | Required by the original backend, not by the exported static frontend. Run the included independent enquiry worker, or adapt the API to another backend. |
| D1 binding `DB` and `discovery_requests` | Provision a database under your own account and apply the included SQL schema. The current production database and its contents are not exported. |
| Three forms that POST to `/api/discovery` | Static builds use your configured absolute enquiry endpoint. The service must accept JSON and return `{ "ok": true }` on success or `{ "error": "..." }` on failure. |
| Server-side 308 redirects for `/review/...` | Static builds provide browser redirects plus an HTML refresh and fallback link. GitHub Pages cannot supply the original application-generated HTTP 308 status. |
| Root-relative links, image URLs and `_next` assets | The export script and Pages workflow apply the actual repository base path. Rebuild after changing the repository path or custom domain. |
| Metadata base set to `chatgpt.site` | The temporary static source uses your deployment origin. Case-page canonical paths include the repository prefix. |
| `app/chatgpt-auth.ts` helper | It is unused by the website's page components. Preserved in the source but excluded from static output; it is not portable authentication. |
| Hosting statements in `/privacy/` | Current wording is preserved. Update provider and data-processing descriptions for the actual frontend and enquiry hosts before launch. |

## Images and fonts

All 35 original public assets are local files in `public/`; no rendered image is being substituted for source code. No image download from the existing ChatGPT hostname is required to operate the exported site.

The source specifies `Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. It contains no `@font-face`, remote font stylesheet, bundled font binary or `next/font` loader. That exact font stack is preserved; each browser uses an available font from the stack. Adding a downloaded Inter font would be a new design/dependency choice, not recovery of a missing original asset.

## Connect your GoDaddy domain

After the temporary GitHub Pages address works, verify `vyukai.in` for the repository owner on GitHub. Add the domain in the repository's Pages settings before updating the website DNS records at the authoritative DNS provider. If GoDaddy manages those records, keep the existing mail records in place. Set the custom domain through Pages settings when using the supplied Actions workflow.

Rebuild after switching domains so metadata and base paths match. Update the enquiry worker's `SITE_ORIGIN` to the chosen domain and redeploy it. Enable HTTPS in Pages settings when the certificate is ready.

## Source documentation

- GitHub Pages static hosting: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- GitHub Pages workflow and permissions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Publishing-source settings: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
- Next.js base paths: https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
- Cloudflare D1 setup: https://developers.cloudflare.com/d1/get-started/

The original `README.md` is preserved as part of the source snapshot. Use this export guide for independent hosting.
