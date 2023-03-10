import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPlayerComponent } from './footer-player.component';

describe('FooterPlayerComponent', () => {
  let component: FooterPlayerComponent;
  let fixture: ComponentFixture<FooterPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FooterPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
