import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Camp } from './camp';

describe('Camp', () => {
  let component: Camp;
  let fixture: ComponentFixture<Camp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camp],
    }).compileComponents();

    fixture = TestBed.createComponent(Camp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
