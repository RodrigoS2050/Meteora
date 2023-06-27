import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the footer text is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const paragraph = element.querySelector('p');
    expect(paragraph?.textContent).toContain(
      'Desenvolvido por Rodrigo Silva de Almeida | Projeto fictício sem fins comerciais.'
    );
  });

  it('should check if bootstrap icon is present', () => {
    const element: HTMLElement = fixture.nativeElement;
    const bootstrapIcon = element.querySelector('i');
    expect(bootstrapIcon).toBeTruthy();
    const bootstrapIconClass = bootstrapIcon?.getAttribute('class');
    expect(bootstrapIconClass).toEqual('bi bi-c-circle');
  });
});
