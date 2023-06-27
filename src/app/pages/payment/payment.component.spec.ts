import { PaymentComponent } from './payment.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { appReducer } from 'src/app/store/app-state';
import * as CartActions from 'src/app/store/actions/cart.actions';
import * as AuthActions from 'src/app/store/actions/auth.actions';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot(appReducer)],
      declarations: [PaymentComponent],
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation errors for empty username field', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['username'];
    form.setValue('');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btn-teste');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain('Nome é obrigatório');
  });

  it('should show validation errors for invalid username', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['username'];
    form.setValue('user');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.btn-success');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain('Nome Inválido');
  });

  it('should show validation errors for empty creditCard field', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['creditCard'];
    form.setValue('');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btn-teste');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.creditCard');
    expect(errorElement.textContent).toContain(
      'Cartão de Crédito é obrigatório'
    );
  });

  it('should show validation errors for invalid creditCard', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['creditCard'];
    form.setValue('user@');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btn-teste');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.creditCard');
    expect(errorElement.textContent).toContain('Cartão de Crédito Inválido');
  });

  it('should show validation errors for empty cvv field', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['cvv'];
    form.setValue('');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btn-teste');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.cvv');
    expect(errorElement.textContent).toContain('CVV é obrigatório');
  });

  it('should show validation errors for invalid cvv', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const form = component.paymentForm.controls['cvv'];
    form.setValue('1');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#btn-teste');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.cvv');
    expect(errorElement.textContent).toContain('CVV Inválido');
  });

  it('should navigate to home if form is valid', fakeAsync(() => {
    const validFormValue = {
      username: 'John Doe',
      creditCard: '1234567812345678',
      cvv: '123',
    };
    component.paymentForm.setValue(validFormValue);
    const navigateSpy = spyOn(router, 'navigate');
    component.finishPurchase();
    tick(5000);
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  }));

  it('should call the finishPurchase method when clicking the button "Comprar" if the form is valid', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const validFormValue = {
      username: 'John Doe',
      creditCard: '1234567812345678',
      cvv: '123',
    };
    component.paymentForm.setValue(validFormValue);
    spyOn(store, 'dispatch');
    const button = fixture.nativeElement.querySelector('#btn-teste');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(CartActions.resetCart());
  });

  it('should display an item on the payment screen if there is an item in the cart', () => {
    const selectedCartItem = {
      id: '7',
      name: 'Camisa Urban Classic',
      price: 95,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const element = fixture.nativeElement;
    const product = element.querySelector('li');
    expect(product.textContent).toEqual('Camisa Urban Classic - 1x - R$ 95,00');
  });

  it('should not display an item on the payment screen if the purchase has been made', () => {
    const selectedCartItem = {
      id: '14',
      name: 'Bolsa Encanto Floral',
      price: 205,
      quantity: 1,
    };
    store.dispatch(CartActions.addToCart({ item: selectedCartItem }));
    spyOn(store, 'select').and.returnValue(of([selectedCartItem]));
    fixture.detectChanges();
    const validFormValue = {
      username: 'John Doe',
      creditCard: '1234567812345678',
      cvv: '123',
    };
    component.paymentForm.setValue(validFormValue);
    const button = fixture.nativeElement.querySelector('#btn-teste');
    button.click();
    store.dispatch(CartActions.resetCart());
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('li');
    expect(element).toBeNull();
  });

  it('should check if the username of the form is the same as the login', () => {
    const username = 'Alice';
    const email = '';
    const password = '';
    store.dispatch(AuthActions.login({ username, email, password }));
    spyOn(store, 'select').and.returnValue(of([username]));
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.paymentForm.value.username).toEqual(username);
  });
});
