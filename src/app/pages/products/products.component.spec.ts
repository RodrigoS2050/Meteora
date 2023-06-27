import { ProductsComponent } from './products.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import mockProducts from 'src/app/mocks/products.json';
import * as CartActions from 'src/app/store/actions/cart.actions';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  let router: Router;
  let actRoute: ActivatedRoute;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot(provideMockStore)],
      declarations: [ProductsComponent],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    actRoute = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the product list (Handbag) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('handbag');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.handbag);
    expect(component.productName).toEqual('Nossas Bolsas');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update the product list (Shirts) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('shirts');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.shirts);
    expect(component.productName).toEqual('Nossas Camisetas');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update the product list (Shoes) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('shoes');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.shoes);
    expect(component.productName).toEqual('Nossos Calçados');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update the product list (Pants) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('pants');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.pants);
    expect(component.productName).toEqual('Nossas Calças');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update the product list (Coats) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('coats');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.coats);
    expect(component.productName).toEqual('Nossos Casacos');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update the product list (Glasses) when navigating to different categories', () => {
    spyOn(actRoute.snapshot.paramMap, 'get').and.returnValue('glasses');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(actRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(component.products).toEqual(mockProducts.glasses);
    expect(component.productName).toEqual('Nossos Óculos');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should display products correctly', () => {
    component.ngOnInit();
    component.products = mockProducts.shirts;
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const firstProduct = element.querySelector('.card');
    expect(firstProduct).toBeTruthy();
    const productName = firstProduct.querySelector('h3');
    expect(productName.textContent).toEqual('Camisa Urban Classic');
    const productDescription = firstProduct.querySelector('.card-text');
    expect(productDescription.textContent.trim()).toEqual(
      'Camisa clássica e versátil, perfeita para o dia a dia, com corte elegante e variedade de cores neutras.'
    );
    const priceDescription = firstProduct.querySelector('.card-price');
    expect(priceDescription.textContent).toEqual('R$95,00');
  });

  it('should update the product list and title when changing categories', () => {
    component.ngOnInit();
    component.products = mockProducts.shirts;
    component.productName = 'Nossas Camisetas';
    fixture.detectChanges();
    component.ngOnInit();
    component.products = mockProducts.handbag;
    component.productName = 'Nossas Bolsas';
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toContain('Nossas Bolsas:');
    const productElements = fixture.nativeElement.querySelectorAll('.card');
    expect(productElements.length).toEqual(mockProducts.handbag.length);
  });

  it('should call addProduct method with the selected product when clicking "Comprar"', () => {
    spyOn(store, 'dispatch');
    const product = mockProducts.shirts[0];
    component.addProduct(product);
    expect(store.dispatch).toHaveBeenCalledWith(
      CartActions.addToCart({ item: product })
    );
  });
});
