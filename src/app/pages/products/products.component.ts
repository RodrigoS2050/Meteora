import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/store/reducers/cart.reducer';
import { AppState } from 'src/app/store/app-state';
import mockProducts from 'src/app/mocks/products.json';
import * as CartActions from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = null;
  productName: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    switch (id) {
      case 'shirts':
        this.products = mockProducts.shirts;
        this.productName = 'Nossas Camisetas';
        break;
      case 'handbag':
        this.products = mockProducts.handbag;
        this.productName = 'Nossas Bolsas';
        break;
      case 'shoes':
        this.products = mockProducts.shoes;
        this.productName = 'Nossos Calçados';
        break;
      case 'pants':
        this.products = mockProducts.pants;
        this.productName = 'Nossas Calças';
        break;
      case 'coats':
        this.products = mockProducts.coats;
        this.productName = 'Nossos Casacos';
        break;
      case 'glasses':
        this.products = mockProducts.glasses;
        this.productName = 'Nossos Óculos';
        break;
      default:
        break;
    }
  }

  addProduct(item: CartItem) {
    this.store.dispatch(CartActions.addToCart({ item }));
  }
}
