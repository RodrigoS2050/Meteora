import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/app-state';
import * as AuthActions from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/
          ),
        ],
      ],
      email: ['', [Validators.required, , Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z0-9])(?!.*\s).{6,}$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.closeModal();
      const { username, email, password } = this.loginForm.value;
      this.store.dispatch(
        AuthActions.login({
          username: username,
          email: email,
          password: password,
        })
      );
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  closeModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    this.renderer.removeClass(document.body, 'modal-open');
    this.renderer.setStyle(document.body, 'cssText', '');
    if (backdrop) {
      backdrop.remove();
    }
  }
}
