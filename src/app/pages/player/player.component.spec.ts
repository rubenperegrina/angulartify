import { ComponentFixture, TestBed } from '@angular/core/testing';

import { playerComponent } from './player.component';

describe('HomeComponent', () => {
  let component: playerComponent;
  let fixture: ComponentFixture<playerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [playerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(playerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
