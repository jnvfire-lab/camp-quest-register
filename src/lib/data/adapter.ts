import { Submission, DataAdapter } from "../types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * MOCK: apenas loga e retorna ok.
 */
class MockAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    console.log("📝 [MOCK] submission:", submission);
    await sleep(300);
    return { ok: true };
  }
}

/**
 * Apps Script: envia para o Web App do Google Apps Script.
 * - No DEV: usa o endpoint local `/api/submit` (proxy do Vite) ⇒ sem CORS.
 * - Em PROD: usa a URL do GAS definida em VITE_APPS_SCRIPT_URL.
 *   Se o servidor do GAS não devolver CORS, tentamos fallback `no-cors`.
 */
class AppsScriptAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    const APPS = import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined;
    const endpoint = import.meta.env.DEV ? "/api/submit" : APPS;

    console.log(
      "Adapter mode:",
      import.meta.env.VITE_SHEETS_MODE || "apps_script",
      "endpoint:",
      endpoint
    );

    if (!endpoint) {
      console.warn("⚠️ APPS_SCRIPT_URL ausente — fallback MOCK");
      return { ok: true };
    }

    try {
      // 1ª tentativa: requisição normal
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(`Apps Script HTTP ${r.status}: ${txt}`);
      }

      // Tenta ler JSON (quando há CORS adequado ou estamos via proxy)
      try {
        const data = await r.json();
        return { ok: data?.ok ?? true };
      } catch {
        return { ok: true }; // sem JSON legível, mas HTTP ok
      }
    } catch (err) {
      // DEV não deve cair aqui pois o proxy do Vite resolve CORS.
      // Em PROD, se o GAS bloquear CORS, tenta `no-cors`.
      if (!import.meta.env.DEV) {
        console.warn("CORS bloqueou leitura; tentando com no-cors…", err);
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(submission),
        });
        return { ok: true };
      }
      throw err;
    }
  }
}

/**
 * Sheets API (service account) — não usado neste modo.
 */
class SheetsApiAdapter implements DataAdapter {
  async save(): Promise<{ ok: boolean }> {
    console.warn("⚠️ Sheets API adapter não implementado neste projeto");
    return { ok: false };
  }
}

/** Factory */
export const getDataAdapter = (): DataAdapter => {
  const mode = (import.meta.env.VITE_SHEETS_MODE as string) || "apps_script";
  switch (mode) {
    case "apps_script":
      return new AppsScriptAdapter();
    case "sheets_api":
      return new SheetsApiAdapter();
    case "mock":
    default:
      return new MockAdapter();
  }
};

export { MockAdapter, AppsScriptAdapter, SheetsApiAdapter };
