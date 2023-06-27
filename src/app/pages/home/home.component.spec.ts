import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({ selector: 'app-carousel', template: '' })
class CarouselComponentStub {}

@Component({ selector: 'app-category', template: '' })
class CategoryComponentStub {}

@Component({ selector: 'app-promotion', template: '' })
class PromotionComponentStub {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        HomeComponent,
        CarouselComponentStub,
        CategoryComponentStub,
        PromotionComponentStub,
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    expect(fixture.nativeElement.querySelector('.my-5')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.text-center')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.easiness-container')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should check that the number of headings and the text are correct', () => {
    const titlesArray = [
      'Conheça todas as nossas facilidades',
      'Preencha nosso formulário e fique sabendo de todas as novidades!',
    ];
    const element: HTMLElement = fixture.nativeElement;
    const titles = element.querySelectorAll('h2');
    expect(Number(titles.length)).toEqual(2);
    titles.forEach((title, index) => {
      expect(title.textContent!.trim()).toEqual(titlesArray[index]);
    });
  });

  it('should set submitted to true when submitting the form', () => {
    component.sendEmail();
    expect(component.submitted).toBeTruthy();
  });

  it('should show validation errors for empty email field', () => {
    const form = component.form.controls['email'];
    form.setValue('');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.btn-primary');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain('Email é obrigatório');
  });

  it('should show validation errors for invalid email', () => {
    const form = component.form.controls['email'];
    form.setValue('user@');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
    const buyBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.btn-primary');
    buyBtn.click();
    fixture.detectChanges();
    const errorElement: HTMLElement =
      fixture.nativeElement.querySelector('.text-danger');
    expect(errorElement.textContent).toContain('Email Inválido');
  });
});
