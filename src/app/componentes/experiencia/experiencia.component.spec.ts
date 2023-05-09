import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasComponent as ExperienciaComponent } from './experiencia.component';

describe('ExperienciasComponent', () => {
  let component: ExperienciaComponent;
  let fixture: ComponentFixture<ExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
