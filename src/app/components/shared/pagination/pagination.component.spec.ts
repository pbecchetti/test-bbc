import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one page with only one page', () => {
    const pageItems: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.page-item');
    expect(pageItems.length).toBe(3);
  });

  it('should not display previous button on first page', () => {
    const previousButton: HTMLLIElement =
      fixture.nativeElement.querySelectorAll('li.page-item')[0];
    expect(previousButton.textContent).toContain('Previous');
    expect(previousButton.classList).toContain('disabled');
  });

  it('should show 11 page with a large number of pages', () => {
    component.currentPage = 5;
    component.nbItems = 42 * component.limit;
    fixture.detectChanges();
    const pageItems: HTMLElement[] =
      fixture.nativeElement.querySelectorAll('.page-item');
    expect(pageItems.length).toBe(11);
  });
});
