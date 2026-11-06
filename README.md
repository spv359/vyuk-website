# Vyuk new website

This is the separate, private Site for the new Vyuk website. The current draft has one selected hero image, a contact section, and a working use case form. Additional sections can be added here without changing the original Vyuk Site.

## Local development

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm build
```

The contact form posts to `/api/discovery` and stores submissions in Cloudflare D1. Apply the SQL migration in `drizzle/` when deploying outside Sites. The direct email option opens `hello@vyukai.in` in the visitor's mail app.
