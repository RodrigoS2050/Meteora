import { CarouselComponent } from './carousel.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
    });
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the number of images is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const images = element.querySelectorAll('img');
    expect(Number(images.length)).toEqual(6);
  });

  it('should check if the images were loaded', async () => {
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

  it('should check that the number of headings and the text are correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const titles = element.querySelectorAll('h5');
    expect(Number(titles.length)).toEqual(2);
    titles.forEach((title) => {
      expect(title.textContent).toEqual('COLEÇÃO ATEMPORAL');
    });
  });

  it('should check that the number of paragraphs and the text are correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const paragraphs = element.querySelectorAll('p');
    expect(Number(paragraphs.length)).toEqual(2);
    const arrayParagraphs = [
      'Estilo e qualidade para durar.',
      'Alto impacto visual, baixo impacto ambiental!',
    ];
    paragraphs.forEach((paragraph, index) => {
      expect(paragraph.textContent).toEqual(arrayParagraphs[index]);
    });
  });
});
