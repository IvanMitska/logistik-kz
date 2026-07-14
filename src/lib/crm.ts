// Отправка заявки в CRM (CRM-logistik). Если CRM недоступна или не настроена,
// вызывающий код падает обратно на mailto-сценарий.

const CRM_URL = import.meta.env.VITE_CRM_URL as string | undefined;
const CRM_API_KEY = import.meta.env.VITE_CRM_API_KEY as string | undefined;

export interface CrmLead {
  name: string;
  phone: string;
  email?: string;
  cargo?: string;
  estimate?: {
    weightKg: number;
    category: string;
    route: string;
  };
}

export const crmConfigured = Boolean(CRM_URL && CRM_API_KEY);

/** true — заявка принята CRM; false/throw — нужен fallback на mailto. */
export async function submitLeadToCrm(lead: CrmLead): Promise<boolean> {
  if (!crmConfigured) return false;
  const res = await fetch(`${CRM_URL!.replace(/\/$/, '')}/api/public/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CRM_API_KEY!,
    },
    body: JSON.stringify({ ...lead, source: 'website' }),
  });
  return res.ok;
}
