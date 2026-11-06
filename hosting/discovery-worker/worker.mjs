// An independently owned replacement for the original /api/discovery endpoint.
// It uses the same table, field names, validation limits and JSON response contract.
const landscapes = new Set(['erp-crm', 'spreadsheets', 'documents', 'team-knowledge',
  'multiple', 'not-sure', 'discuss']);
const clean = (value, length) => typeof value === 'string' ? value.trim().slice(0, length) : '';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = new Headers({ 'Content-Type': 'application/json', 'Vary': 'Origin' });
    const json = (body, status) => new Response(JSON.stringify(body), { status, headers });
    if (!env.SITE_ORIGIN || !env.DB) return json({ error: 'The enquiry service is not configured.' }, 503);
    if (origin !== env.SITE_ORIGIN) return json({ error: 'This website is not allowed to submit enquiries.' }, 403);
    headers.set('Access-Control-Allow-Origin', env.SITE_ORIGIN);
    headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Max-Age', '86400');
    if (new URL(request.url).pathname !== '/api/discovery') return json({ error: 'Not found.' }, 404);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return json({ error: 'Use POST to submit an enquiry.' }, 405);
    let payload;
    try { payload = await request.json(); }
    catch { return json({ error: 'Please submit valid JSON.' }, 400); }
    if (!payload || typeof payload !== 'object') return json({ error: 'Please submit a valid enquiry.' }, 400);
    if (clean(payload.website, 200)) return json({ ok: true }, 201);
    const fullName = clean(payload.fullName, 100);
    const workEmail = clean(payload.workEmail, 180).toLowerCase();
    const company = clean(payload.company, 160);
    const workflow = clean(payload.workflow, 1600);
    const landscape = clean(payload.dataLandscape, 40);
    if (!fullName || !workEmail || !company || !workflow) return json({ error: 'Please complete all required fields.' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) return json({ error: 'Please enter a valid work email.' }, 400);
    try {
      await env.DB.prepare('INSERT INTO discovery_requests (full_name, work_email, company, workflow, data_landscape) VALUES (?, ?, ?, ?, ?)')
        .bind(fullName, workEmail, company, workflow, landscapes.has(landscape) ? landscape : null).run();
      return json({ ok: true }, 201);
    } catch {
      return json({ error: 'We could not send your request. Please try again.' }, 500);
    }
  },
};
