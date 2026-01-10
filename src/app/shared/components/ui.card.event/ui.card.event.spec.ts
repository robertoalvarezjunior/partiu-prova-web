import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardEvent } from './ui.card.event';

describe('UiCardEvent', () => {
  let component: UiCardEvent;
  let fixture: ComponentFixture<UiCardEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCardEvent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
