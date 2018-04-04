import {
  Component,
  Input,
  Output,
  OnInit, 
  ViewChild,
  ChangeDetectorRef, 
  AfterViewInit,
  forwardRef } from '@angular/core';

import {
  ControlValueAccessor,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  NG_VALUE_ACCESSOR } from '@angular/forms';

import { SamFormService } from '../../form-service';
import { LabelWrapper } from '../../wrappers/label-wrapper';

export function AccessorToken (className) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => className),
    multi: true
  };
}

export class SamFormControl
  implements ControlValueAccessor, OnInit, AfterViewInit {

  @Input() public label: string;
  @Input() public name: string;
  @Input() public hint: string;
  @Input() public errorMessage: string;
  @Input() public required: boolean;
  @Input() public control: FormControl;
  @Input() public useFormService: boolean;
  @Input() public disableValidation: boolean;

  @ViewChild(LabelWrapper) public wrapper: LabelWrapper;

  public defaultValidators: ValidatorFn[] = [];

  protected defaultValue: any = null;
  
  private _value: any = null;
  private _disabled: boolean;

  public onChange: (_?: any) => any = (_) => { return _; };
  public onTouched: () => any = () => { return; };

  public get value (): any {
    return this._value;
  }

  public set value (val: any) {
    this._value = !val ? this.defaultValue : val;
    this.onChange(this.value);
  }

  public get disabled (): boolean {
    return this._disabled;
  }

  public set disabled (state: boolean) {
    this._disabled = state;
  }

  constructor (
    public samFormService: SamFormService,
    public cdr: ChangeDetectorRef) {}

  // Lifecycle Hooks

  public ngOnInit () {
    this.initReactiveForms();
  }

  public ngAfterViewInit() {
    this.initWrapper();
  }

  // ControlValueAccessor Methods

  public writeValue (val) { 
    this.value = val;
  }

  public registerOnChange (fn) {
    this.onChange = fn;
  }

  public registerOnTouched (fn) {
    this.onTouched = fn;
  }

  public setDisabledState (state) {
    this.disabled = state;
  }

  // Member methods

  private initReactiveForms () {
    if (this.control) {

      const validators: ValidatorFn[] = [];

      if (this.disableValidation) {

        if (this.control.validator) {
          validators.push(this.control.validator);
        }

      } else {

        this.defaultValidators.forEach(
          validator => validators.push(validator)
        );

      }

      this.control.setValidators(validators);

      this.setValidationMethod();
    }
}

private setValidationMethod () {

  if (!this.useFormService) {

    this.control.statusChanges.subscribe(
      (_: any) => {
        this.wrapper.formatErrors(this.control);
        this.cdr.detectChanges();
      },
      (err: any) => console.error('Error occurred')
    );

  } else {

    this.samFormService.formEventsUpdated$
      .subscribe(
        (evt: any) => {

          if ((!evt.root
            || evt.root === this.control.root)
            && evt.eventType
            && evt.eventType === 'submit') {

            this.wrapper.formatErrors(this.control);

          } else if ((!evt.root
            || evt.root === this.control.root)
            && evt.eventType
            && evt.eventType === 'reset') {

            this.wrapper.clearError();

          }
        },
        (err: any) => console.error('Error occured')
      );
  }
}

  private initWrapper () {
    if (this.control) {
      this.wrapper.formatErrors(this.control);
      this.cdr.detectChanges();
    }
  }

}