import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarQueja } from './registrar-queja';

describe('RegistrarQueja', () => {
  let component: RegistrarQueja;
  let fixture: ComponentFixture<RegistrarQueja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarQueja],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarQueja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
