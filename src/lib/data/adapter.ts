import { Submission, DataAdapter } from "../types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** MOCK: só para fallback local, se necessário */
class MockAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    console.log("📝 [MOCK] submission:", submission);
    await sleep(300);
    return { ok: true };
  }
}

/**
 * Adapter que SEMPRE chama /api/submit:
 * - DEV: /api/submit é proxy do Vite para o Apps Script (sem CORS)
 * - PROD: /api/submit é a Function do Cloudflare Pages (sem CORS)
 */
class ApiSubmitAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    const endpoint = "/api/submit";

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      throw new Error(`POST /api/submit HTTP ${r.status}: ${txt}`);
    }
    try {
      const data = await r.json();
      return { ok: data?.ok ?? true };
    } catch {
      return { ok: true };
    }
  }
}

export const getDataAdapter = (): DataAdapter => {
  // Sempre usa a rota /api/submit
  return new ApiSubmitAdapter();

  // Se quiser preservar outros modos:
  // const mode = import.meta.env.VITE_SHEETS_MODE || 'api';
  // return mode === 'mock' ? new MockAdapter() : new ApiSubmitAdapter();
};

export {
  MockAdapter,
  ApiSubmitAdapter as AppsScriptAdapter,
  ApiSubmitAdapter as SheetsApiAdapter,
};
