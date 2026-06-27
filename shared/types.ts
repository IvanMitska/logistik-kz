// Shared domain types for the logistics.kaz Telegram bot + mini-app.
// Pure TS, no runtime deps — imported by both `bot/` and `miniapp/`.

export type CargoCategoryId = 'general' | 'textile' | 'fragile' | 'electronics';
export type RouteId = 'kz' | 'ru';

/** A lead submitted from the mini-app form. */
export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  /** Free-text cargo description / volume / origin. */
  cargo: string;
  /** Optional structured estimate carried over from the calculator. */
  estimate?: {
    weightKg: number;
    category: CargoCategoryId;
    route: RouteId;
    low: number;
    high: number;
    weeks: [number, number];
  };
}

/** A persisted order — a lead that has been accepted and given a number. */
export interface Order {
  /** Public, human-friendly id shown to the client, e.g. "LK-3F8A2". */
  id: string;
  status: OrderStatusId;
  name: string;
  phone: string;
  email?: string;
  cargo: string;
  estimate?: LeadInput['estimate'];
  /** Telegram user who submitted (for status push notifications). */
  tgUserId?: number;
  tgUsername?: string;
  createdAt: number;
  updatedAt: number;
  /** Status change log, oldest first. */
  history: Array<{ status: OrderStatusId; at: number }>;
}

export type OrderStatusId =
  | 'new'
  | 'confirmed'
  | 'warehouse'
  | 'transit'
  | 'customs'
  | 'delivered';
