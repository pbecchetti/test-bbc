import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';

describe('SearchComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No trips to show" if there are no trips', () => {
    component.trips = [];
    const emptyDiv = fixture.debugElement.query(
      By.css('.no-trip')
    ).nativeElement;
    expect(emptyDiv.textContent).toContain('No trips to show');
  });

  it('should display trips if there is one or more trips', () => {
    component.trips = [];
    const emptyDiv = fixture.debugElement.query(
      By.css('.no-trip')
    ).nativeElement;
    expect(emptyDiv.textContent).toContain('No trips to show');
  });
});
