export interface LocalParticipant {
  id: string;
  name: string;
  tagColor: string;
}

export interface LocalPayment {
  id: string;
  title: string;
  amount: number;
  payerId: string;
  participantIds: string[];
}

export interface LocalTemplate {
  id: string;
  name: string;
  participants: LocalParticipant[];
  payments: LocalPayment[];
  createdAt: string;
  updatedAt: string;
}
