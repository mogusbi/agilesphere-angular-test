import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  @Output() public search: EventEmitter<string> = new EventEmitter<string>(null);

  public get isInvalid (): boolean {
    return !this.form.valid;
  }

  constructor (
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit (): void {
    this.createForm();
  }

  public emitSearch (): void {
    this.search.emit(this.form.controls.query.value);
  }

  private createForm (): void {
    this.form = this.formBuilder.group({
      query: [
        null,
        Validators.required
      ]
    });
  }
}
