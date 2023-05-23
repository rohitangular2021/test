import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { TracketService } from '../../../services/tracket.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() userData = new EventEmitter<any>();
  formGroup: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder,
    private service: TracketService,
    public matDialog:MatDialogRef<AddUserComponent>,
    private appService: AppService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(3)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'phone': [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      'address': [null, [Validators.required, Validators.minLength(3)]],
      'password': [null, [Validators.required]],
      'role': ["admin", [Validators.required]],
    });
  }

  numbersOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'Field is required' :
      this.formGroup.get('name').hasError('minLength') ? 'minimum 3 characters' : '';
  }

  getErrorPhone() {
    return this.formGroup.get('phone').hasError('required') ? 'Field is required' :
      this.formGroup.get('phone').hasError('minlength') ? 'min 10 letters' :
        this.formGroup.get('phone').hasError('maxLength') ? 'max 10 letters' : '';
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required' : '';
  }

  onSubmit(fromData: any) {
    this.service.addUser(fromData).subscribe((data1: any) => {
      if (data1?.status == 200) {
        this.appService.openSnackBar(data1?.msg, 5000)
        this.matDialog.close(data1?.data)
      }
    })
  }



}
