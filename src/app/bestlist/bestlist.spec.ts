import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bestlist } from './bestlist';

describe('Bestlist', () => {
  let component: Bestlist;
  let fixture: ComponentFixture<Bestlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bestlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Bestlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
