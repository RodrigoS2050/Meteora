import { CategoryComponent } from './category.component';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductsComponent } from 'src/app/pages/products/products.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  let router: Router;
  let routerLinks: RouterLink[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryComponent],
    });
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it has a title', () => {
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector('.text-center');
    expect(title?.textContent).toEqual('Busque por Categoria:');
  });

  it('should check if the number of images is correct', () => {
    const element: HTMLElement = fixture.nativeElement;
    const images = element.querySelectorAll('img').length;
    expect(Number(images)).toEqual(6);
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

  it('should check that the number of paragraphs and the text are correct', () => {
    const arrayParagraphs = [
      'Camisetas',
      'Bolsas',
      'Calçados',
      'Calças',
      'Casacos',
      'Óculos',
    ];
    const element: HTMLElement = fixture.nativeElement;
    const paragraphs = element.querySelectorAll('p');
    expect(Number(paragraphs.length)).toEqual(6);
    paragraphs.forEach((paragraph, index) => {
      expect(paragraph.textContent).toEqual(arrayParagraphs[index]);
    });
  });

  it('should check if the routes are correct', () => {
    expect(routerLinks.length).withContext('should have 6 routerLinks').toBe(6);
    expect(routerLinks[0].href).toBe('/products/shirts');
    expect(routerLinks[1].href).toBe('/products/handbag');
    expect(routerLinks[2].href).toBe('/products/shoes');
    expect(routerLinks[3].href).toBe('/products/pants');
    expect(routerLinks[4].href).toBe('/products/coats');
    expect(routerLinks[5].href).toBe('/products/glasses');
  });

  it('should navigate to the route correctly', fakeAsync(() => {
    const routerLink = linkDes[1];
    router.resetConfig([
      {
        path: 'products/:id',
        component: ProductsComponent,
      },
    ]);
    routerLink.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();
    expect(router.url).toBe('/products/handbag');
  }));
});
