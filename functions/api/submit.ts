// functions/api/submit.ts
export const onRequestPost: PagesFunction<{
  APPS_SCRIPT_URL: string;
}> = async (context) => {
  try {
    const { request, env } = context;
    const url = env.APPS_SCRIPT_URL;
    if (!url) {
      return new Response(
        JSON.stringify({ ok: false, error: "APPS_SCRIPT_URL ausente" }),
        {
          status: 500,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const bodyText = await request.text();

    // Repassa ao Apps Script como JSON
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText,
    });

    const text = await r.text();

    // Tenta devolver JSON limpo; se não for JSON, devolve ok:true
    try {
      const data = JSON.parse(text);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message || err) }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
};
