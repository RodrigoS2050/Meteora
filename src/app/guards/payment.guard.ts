import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AppState } from 'src/app/store/app-state';

export const paymentGuard: CanActivateFn = (route, state) => {
  const store: Store<AppState> = inject(Store);
  const router: Router = inject(Router);
  return store
    .select((state) => state.auth.loggedIn)
    .pipe(
      map((authenticated) => {
        if (!authenticated) {
          return router.createUrlTree(['home']);
        } else {
          return true;
        }
      })
    );
};
