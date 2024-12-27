import { Account } from "./account.model";

export interface Client {
    id: number;          
    nom: string;         
    prenom: string;      
    rib: string;          
    accounts: Account[];  
  }