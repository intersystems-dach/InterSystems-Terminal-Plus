import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyAreaComponent } from './reply-area.component';

describe('ReplyAreaComponent', () => {
  let component: ReplyAreaComponent;
  let fixture: ComponentFixture<ReplyAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyAreaComponent]
    });
    fixture = TestBed.createComponent(ReplyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
