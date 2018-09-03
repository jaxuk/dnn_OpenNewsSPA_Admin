import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveArticlesComponent } from './approve-articles.component';

describe('ApproveArticlesComponent', () => {
  let component: ApproveArticlesComponent;
  let fixture: ComponentFixture<ApproveArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
