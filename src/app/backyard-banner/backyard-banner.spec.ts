import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackyardBanner } from './backyard-banner';

describe('BackyardBanner', () => {
  let component: BackyardBanner;
  let fixture: ComponentFixture<BackyardBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackyardBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(BackyardBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
