import { LogoutModalComponent } from './logout-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from 'src/app/store/actions/auth.actions';
import * as CartActions from 'src/app/store/actions/cart.actions';

describe('LogoutModalComponent', () => {
  let component: LogoutModalComponent;
  let fixture: ComponentFixture<LogoutModalComponent>;

  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(provideMockStore)],
      declarations: [LogoutModalComponent],
    });
    fixture = TestBed.createComponent(LogoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logout button', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Sair');
  });

  it('should check if the title of the modal is present', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('h1');
    expect(title?.textContent).toEqual('Fazer Logoff');
  });

  it('should check if the paragraph of the modal is present', () => {
    const element: HTMLElement = fixture.nativeElement;
    const paragraph = element.querySelector('p');
    expect(paragraph?.textContent).toEqual('Você tem certeza que deseja sair?');
  });

  it('should open the modal when the logout button is clicked', () => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.detectChanges();
    const modalElement: HTMLElement =
      fixture.nativeElement.querySelector('.modal');
    const modalDisplayStyle = window.getComputedStyle(modalElement).display;
    expect(modalDisplayStyle).toBe('block');
  });

  it('should close the modal when the logout button is clicked', () => {
    const buttonElement: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();
    fixture.detectChanges();
    const closeButtonElement: HTMLElement =
      fixture.nativeElement.querySelector('.btn-close');
    closeButtonElement.click();
    fixture.detectChanges();
    const modalElement: HTMLElement =
      fixture.nativeElement.querySelector('.modal.show');
    expect(modalElement).toBeFalsy();
  });

  it('should dispatch logout and resetCart actions, and navigate to home', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    expect(store.dispatch).toHaveBeenCalledWith(CartActions.resetCart());
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });
});
