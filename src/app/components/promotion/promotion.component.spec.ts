import { PromotionComponent } from './promotion.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as CartActions from 'src/app/store/actions/cart.actions';

describe('PromotionComponent', () => {
  let component: PromotionComponent;
  let fixture: ComponentFixture<PromotionComponent>;

  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(provideMockStore)],
      declarations: [PromotionComponent],
    });
    fixture = TestBed.createComponent(PromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it has a title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('.text-center');
    expect(title?.textContent).toEqual('Promoções que estão bombando!');
  });

  it('should check if the number of images is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const images = element.querySelectorAll('img');
    expect(Number(images.length)).toEqual(6);
  });

  it('should check if the images were loaded', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const imageElements = element.querySelectorAll('img');
    const temp: Promise<any>[] = [];
    imageElements.forEach((imagem) => {
      const image = imagem as HTMLImageElement;
      temp.push(
        new Promise((resolve) => {
          image.onload = () => {
            const rect = image.getBoundingClientRect();
            expect(rect.height).toBeGreaterThan(0);
            expect(rect.width).toBeGreaterThan(0);
            resolve(true);
          };
        })
      );
    });
    return Promise.all(temp);
  });

  it('should check if the number of titles is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titles = element.querySelectorAll('h5');
    expect(Number(titles.length)).toEqual(6);
  });

  it('should check if the number of paragraphs is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const paragraphs = element.querySelectorAll('p');
    expect(Number(paragraphs.length)).toEqual(12);
  });

  it('should display products correctly', () => {
    const element = fixture.nativeElement;
    const firstProduct = element.querySelector('.card');
    expect(firstProduct).toBeTruthy();
    const productName = firstProduct.querySelector('.card-title');
    expect(productName.textContent).toEqual('Camiseta Conforto');
    const productDescription = firstProduct.querySelector('.card-text');
    expect(productDescription.textContent.trim()).toEqual(
      'Multicores e tamanhos. Tecido de algodão 100% fresquinho para o verão. Modelagem unissex.'
    );
    const priceDescription = firstProduct.querySelector('.card-price');
    expect(priceDescription.textContent).toEqual('R$70,00');
  });

  it('should call addProduct method when "Comprar" button is clicked', () => {
    const itemAdded = {
      id: '1',
      name: 'Camiseta Conforto',
      description:
        'Multicores e tamanhos. Tecido de algodão 100% fresquinho para o verão. Modelagem unissex.',
      price: 70,
      src: 'assets/products/t-shirts.png',
      alt: 'Modelo masculo vestindo touca preta, blusa marrom e calça jeans, com uma parede cinza de fundo.',
      quantity: 1,
    };
    spyOn(store, 'dispatch');
    const btnElement = fixture.nativeElement;
    const addButton = btnElement.querySelector('.btn-primary');
    addButton.click();
    expect(store.dispatch).toHaveBeenCalledWith(
      CartActions.addToCart({ item: itemAdded })
    );
  });
});
