import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app-state';
import { CartItem } from 'src/app/store/reducers/cart.reducer';
import * as CartActions from 'src/app/store/actions/cart.actions';
import * as CartSelectors from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  quantity$!: Observable<number>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.items$ = this.store.select(CartSelectors.selectCartItems);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
    this.quantity$ = this.store.select(CartSelectors.selectCartQuantity);
  }

  removeProduct(itemId: string) {
    this.store.dispatch(CartActions.removeFromCart({ itemId }));
    this.quantity$.subscribe((state) => {
      if (state === 0) {
        this.closeModal();
      }
    });
  }

  goToPayment() {
    this.router.navigate(['payment']);
  }

  closeModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.setStyle(document.body, 'cssText', '');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
