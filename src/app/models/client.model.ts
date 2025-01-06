import { Account } from './account.model';

export interface Client {
  id: number;             // Unique identifier for the client
  nom: string;            // Client's first name
  prenom: string;         // Client's last name
  accounts?: Account[];   // List of accounts associated with the client
}
