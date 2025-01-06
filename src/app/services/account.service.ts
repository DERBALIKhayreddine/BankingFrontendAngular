import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8088/api/v1/accounts';

  constructor(private http: HttpClient) {}

  // Get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  // Get account by ID
  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  // Create a new account
  createAccount(clientId: number, account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/${clientId}`, {
      rib: account.rib,
      accountBalance: account.accountBalance,
    });
  }

  // Update an account
  updateAccount(id: number, account: { rib: string; accountBalance: number }): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }

  // Delete an account
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}