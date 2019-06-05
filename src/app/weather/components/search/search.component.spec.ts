import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('SearchComponent', (): void => {
  let fixture: ComponentFixture<SearchComponent>;
  let instance: SearchComponent;
  let formBuilder: FormBuilder;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [
        SearchComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    });

    fixture = TestBed.createComponent(SearchComponent);
    instance = fixture.componentInstance;

    formBuilder = TestBed.get(FormBuilder);

    spyOn(formBuilder, 'group').and.callThrough();
    spyOn(instance.search, 'emit').and.stub();

    fixture.detectChanges();
  });

  it('should compile', (): void => {
    expect(instance).toBeTruthy();
  });

  it('should have the correct form schema', (): void => {
    expect(formBuilder.group).toHaveBeenCalledWith({
      query: [
        null,
        Validators.required
      ]
    });
  });

  describe('isInvalid', (): void => {
    it('should be invalid if query is not input', (): void => {
      instance.form.controls.query.setValue('');

      expect(instance.isInvalid).toEqual(true);
    });

    it('should be valid if query is input', (): void => {
      instance.form.controls.query.setValue('Newcastle');

      expect(instance.isInvalid).toEqual(false);
    });
  });

  describe('emitSearch', (): void => {
    it('should emit with the correct value', (): void => {
      instance.form.controls.query.setValue('London');

      instance.emitSearch();

      expect(instance.search.emit).toHaveBeenCalledWith('London');
    });
  });
});
