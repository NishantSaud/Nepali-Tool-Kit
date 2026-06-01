import { runFetchJob } from '../../../../backend/cron/fetchAllRates.js';

export async function POST(request) {
  // Protect with a shared secret so only authorized Vercel Cron can call it
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }
  try {
    const results = await runFetchJob();
    return Response.json({ ok: true, results });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
