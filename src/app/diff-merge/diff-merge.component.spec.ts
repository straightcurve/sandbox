import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffMergeComponent } from './diff-merge.component';

describe('DiffMergeComponent', () => {
  let component: DiffMergeComponent;
  let fixture: ComponentFixture<DiffMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiffMergeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
