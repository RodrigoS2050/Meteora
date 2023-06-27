import { Component } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  categories: Category[] = [
    {
      name: 'Camisetas',
      src: 'assets/categories/t-shirts.png',
      alt: 'Camiseta masculina de manga na cor verde, com bolso, com detalhe vermelho',
      link: 'shirts',
    },
    {
      name: 'Bolsas',
      src: 'assets/categories/handbag.png',
      alt: 'Bolsa feminina de couro na cor marrom, com cortes quadrados, e alça dourada em formato de corrente com detalhe verde, em fundo verde limão.',
      link: 'handbag',
    },
    {
      name: 'Calçados',
      src: 'assets/categories/shoes.png',
      alt: 'Par de tênis unissex com cor predominante branca e traços na cores laranja, azul, verde e cadarço vermelho, em fundo verde limão.',
      link: 'shoes',
    },
    {
      name: 'Calças',
      src: 'assets/categories/pants.png',
      alt: 'Quatro calças jeans dobradas e organizadas uma acima da outra, em fundo verde limão.',
      link: 'pants',
    },
    {
      name: 'Casacos',
      src: 'assets/categories/coats.png',
      alt: 'Casaco masculino na cor marrom em fundo verde limão.',
      link: 'coats',
    },
    {
      name: 'Óculos',
      src: 'assets/categories/glasses.png',
      alt: 'Óculos de Sol com lentes arredondadas e armação dourada, em fundo verde limão.',
      link: 'glasses',
    },
  ];
}
