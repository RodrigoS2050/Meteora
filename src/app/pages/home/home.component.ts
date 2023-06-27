import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, , Validators.email]],
    });
  }

  facilities = [
    {
      title: 'PAGUE PELO PIX',
      description: 'Ganhe 5% OFF em pagamentos via PIX',
      icon: 'bi bi-x-diamond',
    },
    {
      title: 'TROCA GRÁTIS',
      description: 'Fique livre para trocar em até 30 dias.',
      icon: 'bi bi-arrow-repeat',
    },
    {
      title: 'SUSTENTABILIDADE',
      description: 'Moda responsável, que respeita o meio ambiente.',
      icon: 'bi bi-flower1',
    },
  ];

  sendEmail() {
    this.submitted = true;
  }
}
