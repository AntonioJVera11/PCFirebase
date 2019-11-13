import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiezadetallePage } from './piezadetalle.page';

describe('PiezadetallePage', () => {
  let component: PiezadetallePage;
  let fixture: ComponentFixture<PiezadetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiezadetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiezadetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
