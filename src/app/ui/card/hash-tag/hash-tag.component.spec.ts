import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MommooHashTag } from './hash-tag.component';

describe('MommooHashTag', () => {
  let component: MommooHashTag;
  let fixture: ComponentFixture<MommooHashTag>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MommooHashTag ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MommooHashTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
