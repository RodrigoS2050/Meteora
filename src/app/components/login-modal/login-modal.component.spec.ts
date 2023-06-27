import { LoginModalComponent } from './login-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as AuthActions from 'src/app/store/actions/auth.actions';

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot(provideMockStore)],
      declarations: [LoginModalComponent],
    });
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login button', () => {
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Login');
  });

  it('should display the login form', () => {
    const loginForm = fixture.nativeElement.querySelector('form');
    expect(loginForm).toBeTruthy();
  });

  it('should validate for valid username', () => {
    const form = component.loginForm.controls['username'];
    form.setValue('John Doe');
    fixture.detectChanges();
    expect(form.invalid).toBeFalsy();
  });

  it('should show validation errors for invalid username', () => {
    const form = component.loginForm.controls['username'];
    form.setValue('');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const registerBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('#registerBtn');
    registerBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain('Nome é obrigatório');
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

  it('should toggle the password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePassword();
    expect(component.showPassword).toBe(true);
    component.togglePassword();
    expect(component.showPassword).toBe(false);
  });

  it('should dispatch the login action if the form is valid', () => {
    spyOn(store, 'dispatch');
    const validFormValue = {
      username: 'John Doe',
      email: 'test@gmail.com',
      password: 'testPassword',
    };
    component.loginForm.setValue(validFormValue);
    component.onSubmit();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({
        username: 'John Doe',
        email: 'test@gmail.com',
        password: 'testPassword',
      })
    );
  });
});
