import { paymentGuard } from './payment.guard';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Route,
  Router,
  RouterStateSnapshot,
  provideRouter,
} from '@angular/router';
import {
  RouterTestingHarness,
  RouterTestingModule,
} from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({ selector: 'app-payment', template: 'protectedRoute' })
class PaymentComponentStub {}

describe('paymentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => paymentGuard(...guardParameters));

  let guardResponse: ReturnType<CanActivateFn>;

  const initialState = {};
  let store: MockStore;

  let router: Router;
  let routes: Route[] = [
    {
      path: 'payment',
      component: PaymentComponentStub,
      canActivate: [paymentGuard],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [PaymentComponentStub],
      providers: [provideMockStore({ initialState }), provideRouter(routes)],
    });
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    guardResponse = TestBed.runInInjectionContext(() => {
      return paymentGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should check if you can access the component', async () => {
    store.setState({
      auth: {
        loggedIn: true,
      },
    });
    const harness = await RouterTestingHarness.create();
    expect(router.url).toEqual('/');
    const activatedComponent = await harness.navigateByUrl(
      '/payment',
      PaymentComponentStub
    );
    expect(harness.routeNativeElement?.innerHTML).toContain('protectedRoute');
    expect(router.url).toEqual('/payment');
  });
  it('should allow navigation if state is true', (done) => {
    store.setState({
      auth: {
        loggedIn: true,
      },
    });

    if (guardResponse instanceof Observable) {
      guardResponse.subscribe((response) => {
        expect(response).toBeTrue();
        done();
      });
    }
  });

  it('should navigate to home if state is false', (done) => {
    store.setState({
      auth: {
        loggedIn: false,
      },
    });
    if (guardResponse instanceof Observable) {
      guardResponse.subscribe((response) => {
        expect(response.toString()).toEqual('/home');
        done();
      });
    }
  });
});
