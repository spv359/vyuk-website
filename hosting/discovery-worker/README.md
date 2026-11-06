# Independent Vyuk enquiry service

This Worker stores the same enquiry fields as `app/api/discovery/route.ts` and accepts requests from the separately hosted static frontend. Deploy it to your own Cloudflare account. The static frontend does not require a ChatGPT account, Sites runtime or Sites credentials.

From the project root, after installing dependencies:

```sh
pnpm exec wrangler login
pnpm exec wrangler d1 create vyuk-website-enquiries
```

Copy the returned database ID into `hosting/discovery-worker/wrangler.jsonc`, replacing `REPLACE_WITH_YOUR_OWN_D1_DATABASE_ID`. Set `SITE_ORIGIN` to the exact frontend origin, such as `https://YOUR_USERNAME.github.io` or `https://www.your-domain.example`. An origin has no trailing slash or repository path.

Apply the original schema to the new database, then deploy:

```sh
pnpm exec wrangler d1 execute vyuk-website-enquiries --remote --file drizzle/0000_amused_bulldozer.sql --config hosting/discovery-worker/wrangler.jsonc
pnpm exec wrangler deploy --config hosting/discovery-worker/wrangler.jsonc
```

Set the repository variable `DISCOVERY_API_URL` to the deployed worker URL with `/api/discovery` appended. Rebuild/redeploy the frontend. Do not put a Cloudflare API token in browser code.

Use `node --test hosting/discovery-worker/worker.test.mjs` for contract tests. These use a mock database and send nothing to production.

The endpoint accepts JSON containing `fullName`, `workEmail`, `company`, `workflow`, optional `dataLandscape` and the `website` honeypot field. Successful requests return HTTP 201 and `{ "ok": true }`. Validation errors return HTTP 400; storage errors return HTTP 500. The frontend shows success only after a successful response. Demo requests identify their product in `workflow`, matching the current website.

The service saves records to D1. It does not send notification emails. Review records through your own database tooling, and operate the enquiry retention process described in `docs/website-privacy-operations.md`.

The current Sites database and its existing records are not included. This configuration creates an independent service; it does not repoint or modify the live Sites application.
