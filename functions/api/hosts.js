/**
 * Cloudflare Pages Function: /api/hosts
 * Direct Cloudflare D1 Database Integration for Sindikato Agency Hosts
 */

export async function onRequestGet(context) {
  const { env } = context;

  // Fallback if D1 is not bound (e.g. local preview without wrangler d1)
  if (!env.DB) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "D1 Database binding 'DB' is not configured yet.",
        data: []
      }),
      {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        status: 200
      }
    );
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM hosts ORDER BY id ASC").all();

    return new Response(
      JSON.stringify({
        success: true,
        count: results.length,
        data: results
      }),
      {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        status: 200
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        status: 500
      }
    );
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    return new Response(
      JSON.stringify({ success: false, message: "D1 Database binding 'DB' not found." }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { id_number, id_name, valid_days, live_time, gift_revenue, game_revenue, app, status } = body;

    if (!id_number || !id_name) {
      return new Response(
        JSON.stringify({ success: false, message: "id_number and id_name are required." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    const info = await env.DB.prepare(
      `INSERT INTO hosts (id_number, id_name, valid_days, live_time, gift_revenue, game_revenue, app, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id_number) DO UPDATE SET
         id_name = excluded.id_name,
         valid_days = excluded.valid_days,
         live_time = excluded.live_time,
         gift_revenue = excluded.gift_revenue,
         game_revenue = excluded.game_revenue,
         app = excluded.app,
         status = excluded.status,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(
      id_number,
      id_name,
      valid_days || '0 Days',
      live_time || '0 hrs',
      gift_revenue || '₱0',
      game_revenue || '₱0',
      app || 'TikTok LIVE',
      status || 'Active'
    ).run();

    return new Response(
      JSON.stringify({ success: true, message: "Host saved to D1 successfully.", info }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, status: 500 }
    );
  }
}
