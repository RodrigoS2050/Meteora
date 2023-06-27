import { HeaderComponent } from './header.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { HomeComponent } from 'src/app/pages/home/home.component';
import * as AuthActions from 'src/app/store/actions/auth.actions';

@Component({ selector: 'app-login-modal', template: '' })
class LoginStubComponent {}

@Component({ selector: 'app-cart', template: '' })
class CartStubComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(provideMockStore)],
      declarations: [HeaderComponent, LoginStubComponent, CartStubComponent],
      providers: [provideRouter([{ path: 'home', component: HomeComponent }])],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct logo image source', () => {
    const logoImg: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(logoImg.src).toContain('/assets/meteora-image.png');
  });

  it('should check if the image were loaded', () => {
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

  it('should navigate to home when Home link is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    router.navigate(['/home']);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    expect(navigateSpy.calls.mostRecent().args[0]).toEqual(['/home']);
  });

  it('should display login modal if not logged in', () => {
    component.loggedIn$ = of(false);
    fixture.detectChanges();
    const loginModal = fixture.nativeElement.querySelector('app-login-modal');
    expect(loginModal).toBeTruthy();
  });

  it('should dispatch logout action on logout', () => {
    spyOn(store, 'dispatch');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  });

  it('should dispatch logout action and navigate to home', () => {
    spyOn(store, 'dispatch');
    spyOn(router, 'navigate');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should set loggedIn$ and username$ observables', () => {
    spyOn(store, 'dispatch');
    const loggedIn = true;
    const username = 'John Doe';
    spyOn(store, 'select').and.returnValues(of(loggedIn), of(username));
    component.ngOnInit();
    expect(component.loggedIn$).toBeTruthy();
    expect(component.username$).toBeTruthy();
    component.loggedIn$.subscribe((value) => {
      expect(value).toEqual(loggedIn);
    });
    component.username$.subscribe((value) => {
      expect(value).toEqual(username);
    });
  });
});
