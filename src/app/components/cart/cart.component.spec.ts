import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { Component } from '@angular/core';
import * as CartActions from 'src/app/store/actions/cart.actions';

@Component({ selector: 'app-logout-modal', template: '' })
class LogoutComponentStub {}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let router: Router;
  let store: Store;
  let storeMock: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj<Store<AppState>>('Store', [
      'dispatch',
      'select',
    ]);
    storeMock.select.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(provideMockStore)],
      declarations: [CartComponent, LogoutComponentStub],
      providers: [{ provide: Store, useValue: storeMock }],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the title is correct', () => {
    const elements: HTMLElement = fixture.nativeElement;
    const title = elements.querySelector('h1');
    expect(title?.textContent).toEqual('Itens no carrinho');
  });

  it('should check that the number of buttons is correct', () => {
    const elements: HTMLElement = fixture.nativeElement;
    const buttons = elements.querySelectorAll('button');
    expect(Number(buttons.length)).toEqual(4);
  });

  it('should check that the number of paragraphs is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const paragraphs = element.querySelectorAll('p');
    expect(Number(paragraphs.length)).toEqual(3);
  });

  it('should initialize selectors correctly', () => {
    expect(component.items$).toBeTruthy();
    expect(component.totalPrice$).toBeTruthy();
    expect(component.quantity$).toBeTruthy();
  });

  it('should update cart when removing an item', () => {
    const item = { id: '1', name: 'Item', price: 10, quantity: 1 };
    store.dispatch(CartActions.removeFromCart({ itemId: item.id }));
    fixture.detectChanges();
    component.items$.subscribe((items) => {
      expect(items).not.toContain(item);
    });
    component.totalPrice$.subscribe((totalPrice: any) => {
      expect(totalPrice).toEqual([]);
    });
    component.quantity$.subscribe((quantity: any) => {
      expect(quantity).toEqual([]);
    });
  });

  it('should remove an item from the cart when calling the removeProduct function', () => {
    const itemId = '1';
    const removeAction = CartActions.removeFromCart({ itemId });
    component.removeProduct(itemId);
    expect(store.dispatch).toHaveBeenCalledWith(removeAction);
    component.quantity$.subscribe((quantity: any) => {
      expect(quantity).toEqual([]);
    });
  });

  it('should navigate to payment page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToPayment();
    expect(navigateSpy).toHaveBeenCalledWith(['payment']);
  });

  it('should close the modal and remove backdrop', () => {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    document.body.appendChild(backdrop);
    document.body.classList.add('modal-open');
    document.body.style.cssText = '';
    component.closeModal();
    expect(document.querySelector('.modal-backdrop')).toBeNull();
    expect(document.body.classList.contains('modal-open')).toBeFalsy();
    expect(document.body.style.cssText).toBe('');
    backdrop.remove();
  });
});
