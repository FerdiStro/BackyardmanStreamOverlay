import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartSoon } from './start-soon';

describe('StartSoon', () => {
  let component: StartSoon;
  let fixture: ComponentFixture<StartSoon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartSoon],
    }).compileComponents();

    fixture = TestBed.createComponent(StartSoon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
