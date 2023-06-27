import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import * as AuthSelector from 'src/app/store/selectors/auth.selector';
import * as AuthActions from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn$!: Observable<boolean>;
  username$!: Observable<string | undefined>;
  isMobile: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(AuthSelector.isLoggedIn);
    this.username$ = this.store.select(AuthSelector.selectUsername);
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['home']);
  }
}
