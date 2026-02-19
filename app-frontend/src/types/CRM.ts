export interface Contact {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface ContactInteraction {
  id?: string;
  updated_at?: string;
  contact_id: string;
  type: InteractionType;
  note: string;
}

export enum InteractionType {
  Email = "Email",
  PhoneCall = "Phone Call",
  Deal = "Deal",
}
