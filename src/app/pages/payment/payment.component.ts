import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { CartItem } from 'src/app/store/reducers/cart.reducer';
import * as CartActions from 'src/app/store/actions/cart.actions';
import * as CartSelectors from 'src/app/store/selectors/cart.selector';
import * as AuthSelectors from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  items$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  quantity$!: Observable<number>;
  submitted: boolean = false;
  purchaseCompleted = false;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
    this.quantity$ = this.store.select(CartSelectors.selectCartQuantity);
    this.paymentForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/
          ),
        ],
      ],
      creditCard: [
        '',
        [Validators.required, Validators.pattern(/\b(?:\d[ -]*?){16}\b/)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
    });
    this.store
      .pipe(select(AuthSelectors.selectUsername))
      .subscribe((username) => {
        this.paymentForm.patchValue({ username });
      });
  }

  finishPurchase() {
    this.submitted = true;
    if (this.paymentForm.valid) {
      this.purchaseCompleted = true;
      this.store.dispatch(CartActions.resetCart());
      setTimeout(() => {
        this.router.navigate(['home']);
        this.purchaseCompleted = false;
      }, 5000);
    }
  }
}
