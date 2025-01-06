import { Component } from '@angular/core';
import { AccountListComponent } from "../../components/accounts/account-list/account-list.component";

@Component({
  selector: 'app-accounts',
  imports: [AccountListComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

}
