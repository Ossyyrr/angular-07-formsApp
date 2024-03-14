import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent {
  //! Para precargar datos en el formulario se usa el onInit y dentro el metodo reset del formulario pasando los datos a mostrar

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''), // Primera variable: el valor por defecto. Segunda: validaciones sincronas []. Tercera: validaciones asincronas []
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  constructor(private formBuilder: FormBuilder) {}

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field].errors) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo debe tener al menos ${errors[key].requiredLength} caracteres`;
      }
    }
    return null;
  }

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]], // Primera variable: el valor por defecto. Segunda: validaciones sincronas []. Tercera: validaciones asincronas [
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0,
    });
  }
}
