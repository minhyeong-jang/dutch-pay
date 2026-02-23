import type { Participant } from "./participant";
import type { Payment } from "./payment";

export interface Template {
  id: string;
  name: string;
  participants: Participant[];
  payments: Payment[];
}
