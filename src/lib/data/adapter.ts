import { Submission, DataAdapter } from '../types';

// Mock adapter - logs data and returns success
class MockAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    console.log('📝 Mock submission received:', submission);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { ok: true };
  }
}

// Google Apps Script adapter (TODO: implementation pending)
class AppsScriptAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    // TODO: Implement Google Apps Script integration
    // const response = await fetch(process.env.APPS_SCRIPT_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(submission)
    // });
    // return { ok: response.ok };
    
    console.warn('⚠️ Apps Script adapter not implemented yet');
    return { ok: false };
  }
}

// Google Sheets API adapter (TODO: implementation pending)
class SheetsApiAdapter implements DataAdapter {
  async save(submission: Submission): Promise<{ ok: boolean }> {
    // TODO: Implement Google Sheets API integration using googleapis
    // This would use GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, etc.
    
    console.warn('⚠️ Sheets API adapter not implemented yet');
    return { ok: false };
  }
}

// Factory function to get the appropriate adapter
export const getDataAdapter = (): DataAdapter => {
  const mode = import.meta.env.VITE_SHEETS_MODE || 'mock';
  
  switch (mode) {
    case 'apps_script':
      return new AppsScriptAdapter();
    case 'sheets_api':
      return new SheetsApiAdapter();
    case 'mock':
    default:
      return new MockAdapter();
  }
};

export { MockAdapter, AppsScriptAdapter, SheetsApiAdapter };