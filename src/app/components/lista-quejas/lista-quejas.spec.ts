import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaQuejas } from './lista-quejas';

describe('ListaQuejas', () => {
  let component: ListaQuejas;
  let fixture: ComponentFixture<ListaQuejas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaQuejas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaQuejas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
