import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as AuthActions from 'src/app/store/actions/auth.actions';
import * as CartActions from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss'],
})
export class LogoutModalComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.store.dispatch(CartActions.resetCart());
    this.router.navigate(['home']);
  }
}
