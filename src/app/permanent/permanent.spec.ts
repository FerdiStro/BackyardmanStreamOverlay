import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Permanent } from './permanent';

describe('Permanent', () => {
  let component: Permanent;
  let fixture: ComponentFixture<Permanent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Permanent],
    }).compileComponents();

    fixture = TestBed.createComponent(Permanent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
