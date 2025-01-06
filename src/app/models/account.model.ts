import { Client } from './client.model';

export interface Account {
  id: number;              // Unique identifier for the account
  rib: string;             // RIB (unique account number)
  accountBalance: number; 
  clientName: string;     // Account balance
  client?: {               // Associated client (optional for compatibility)
    id: number;
    nom: string;
    prenom: string;
  };
}