import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { CartItem } from 'src/app/store/reducers/cart.reducer';
import { Product } from 'src/app/models/product';
import * as CartActions from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent {
  constructor(private store: Store<AppState>) {}

  products: Product[] = [
    {
      id: '1',
      name: 'Camiseta Conforto',
      description:
        'Multicores e tamanhos. Tecido de algodão 100% fresquinho para o verão. Modelagem unissex.',
      price: 70,
      src: 'assets/products/t-shirts.png',
      alt: 'Modelo masculo vestindo touca preta, blusa marrom e calça jeans, com uma parede cinza de fundo.',
      quantity: 1,
    },
    {
      id: '2',
      name: 'Calça Alfaiataria',
      description:
        'Modelo Wide Leg alfaiataria em linho. Uma peça para vida toda!',
      price: 180,
      src: 'assets/products/pants.png',
      alt: 'Modelo feminina vestindo blusa marrom, calça bege, par de sapatos altos na cor branca, cordão e pulseira, em um ambiente aberto com chão de terra e matos secos.',
      quantity: 1,
    },
    {
      id: '3',
      name: 'Tênis Chunky',
      description:
        'Snicker casual com solado mais alto e modelagem robusta. Modelo unissex.',
      price: 250,
      src: 'assets/products/shoes.png',
      alt: 'Foco nos pés de modelo usando par de tênis e meia na cor branca, e calça na cor preta, pisando em uma poça de água.',
      quantity: 1,
    },
    {
      id: '4',
      name: 'Jaqueta Jeans',
      description:
        'Modelo unissex oversized com gola de camurça. Atemporal e autêntica!',
      price: 180,
      src: 'assets/products/jacket.png',
      alt: 'Modelo masculino vestindo toca e calça na cor preta, jaqueta jeans azul, blusa branca e cordão dourado, em um fundo branco.',
      quantity: 1,
    },
    {
      id: '5',
      name: 'Óculos Redondo',
      description:
        'Armação metálica em grafite com lentes arredondadas. Sem erro!',
      price: 120,
      src: 'assets/products/glasses.png',
      alt: 'Modelo masculino com blusa branca e um par de óculos de lentes transparentes arredondadas, utilizando um notebook, com um cachorro poodle branco no seu colo, e em um fundo branco.',
      quantity: 1,
    },
    {
      id: '6',
      name: 'Bolsa Coringa',
      description:
        'Bolsa camel em couro sintético de alta duração. Ideal para acompanhar você por uma vida!',
      price: 120,
      src: 'assets/products/handbag.png',
      alt: 'Cintura, pernas e pés de modelo feminina vestindo sobretudo de cor predominante bege com detalhes em tom vermelho e escuro, com calça e par de sapatos na cor preta, segurando bolsa na cor bege, com fundo de prédio.',
      quantity: 1,
    },
  ];

  addProduct(item: CartItem) {
    this.store.dispatch(CartActions.addToCart({ item }));
  }
}
