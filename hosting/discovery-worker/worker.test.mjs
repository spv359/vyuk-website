import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

const origin = 'https://vyukai.example';
const valid = { fullName: ' Founder ', workEmail: 'FOUNDER@example.com', company: 'Vyuk', workflow: 'A demo', website: '' };
function environment(fail = false) {
  const calls = [];
  return { calls, SITE_ORIGIN: origin, DB: { prepare(sql) {
    return { bind(...values) { return { async run() {
      if (fail) throw new Error('Unavailable');
      calls.push({ sql, values });
    } }; } };
  } } };
}
const request = (body = valid, source = origin) => new Request('https://enquiries.example/api/discovery', {
  method: 'POST', headers: { Origin: source, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
test('valid submissions use the original schema and normalize input', async () => {
  const env = environment();
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
  assert.deepEqual(env.calls[0].values, ['Founder', 'founder@example.com', 'Vyuk', 'A demo', null]);
});
test('CORS preflight succeeds for the configured website', async () => {
  const response = await worker.fetch(new Request('https://enquiries.example/api/discovery', { method: 'OPTIONS', headers: { Origin: origin } }), environment());
  assert.equal(response.status, 204);
});
test('a different origin cannot create a record', async () => {
  const env = environment();
  const response = await worker.fetch(request(valid, 'https://other.example'), env);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(env.calls.length, 0);
});
test('honeypot entries are accepted without storage', async () => {
  const env = environment();
  assert.equal((await worker.fetch(request({ website: 'bot' }), env)).status, 201);
  assert.equal(env.calls.length, 0);
});
test('missing required fields and invalid email are rejected', async () => {
  for (const payload of [{}, { ...valid, workEmail: 'invalid' }]) {
    const env = environment();
    assert.equal((await worker.fetch(request(payload), env)).status, 400);
    assert.equal(env.calls.length, 0);
  }
});
test('database failure is reported as failure to the form', async () => {
  assert.equal((await worker.fetch(request(), environment(true))).status, 500);
});
