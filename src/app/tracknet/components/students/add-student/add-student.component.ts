import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { TracketService } from 'src/app/tracknet/services/tracket.service';
import { AddUserComponent } from '../../users/add-user/add-user.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  subjects: any[] = [
    { value: 'english', viewValue: 'English' },
    { value: 'hindi', viewValue: 'Hindi' },
    { value: 'maths', viewValue: 'Maths' },
    { value: 'ss', viewValue: 'Social Science' },
    { value: 'science', viewValue: 'Science' },
    { value: 'computer', viewValue: 'Computer' },
  ];
  classes: any[] = [
    { value: '5', viewValue: '5th' }, { value: '6', viewValue: '6th' },
    { value: '7', viewValue: '7th' }, { value: '8', viewValue: '8th' },
    { value: '9', viewValue: '9th' }, { value: '10', viewValue: '10th' },
  ];
  formGroup: FormGroup
  imageUrl: any;
  csv: any;
  selectedValues

  @ViewChild("changeLogo") changeLogo: any;
  @ViewChild("uploadCsv") uploadCsv: any;
  constructor(private service: TracketService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialogRef<AddUserComponent>,
    private appService: AppService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      "name": [null, [Validators.required, Validators.minLength(3)]],
      "email": [null, [Validators.required, Validators.pattern(emailregex)]],
      "phone": [null, [Validators.required, Validators.minLength(3)]],
      "address": [null, [Validators.required, Validators.minLength(3)]],
      "fatherName": [null, [Validators.required, Validators.minLength(3)]],
      "motherName": [null, [Validators.required, Validators.minLength(3)]],
      "className": [null, [Validators.required]],
      "subjects": [null, [Validators.required]],
      "classTeacher": [null, [Validators.required, Validators.minLength(3)]],
      "dob": [null, [Validators.required, Validators.minLength(3)]],
      "gender": [null, [Validators.required]],
      "nationality": [null, [Validators.required,]],
      "photo": [null, [Validators.required,]]
    });
  }

  numbersOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  clearCsv(){
    this.csv = null
  }

  fileChangeEvent(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {

      var pattern = /image-*/;
      reader.readAsDataURL(file);
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      } else {
        // When file uploads set it to file formcontrol
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.formGroup.patchValue({
            photo: file
          });
        }
        // ChangeDetectorRef since file is loading outside the zone
        this.cd.markForCheck();
      }

    }
  }

  getErrorImage() {
    return this.formGroup.get('photo').hasError('required') ? 'Field is required' : ''
  }

  triggerFileInput = () => {
    try {
      this.changeLogo.nativeElement.click();
    } catch (error) {
      console.log(error);
    }
  };

  csvChangeEvent(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {

      var pattern = /csv-*/;
      reader.readAsDataURL(file);
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      } else {
        // When file uploads set it to file formcontrol
        reader.onload = () => {
          this.csv = file;   
        }
        // ChangeDetectorRef since file is loading outside the zone
        this.cd.markForCheck();
      }

    }
  }

  triggerCsv = () => { 
    try {
      this.uploadCsv.nativeElement.click();
    } catch (error) {
      console.log(error);
    }
  };

  uploadCsvFN(){
      if(this.csv){
        this.service.uploadCsv(this.csv).subscribe((data1:any)=>{
          console.log(data1); 
          this.matDialog.close(data1.data)
        })
      }
      else{
        alert("please select a csv file to continue")
      }
  }

  onSubmit(formvalues: any) {
    const payload = new FormData();
    payload.append("name", formvalues.name)
    payload.append("email", formvalues.email)
    payload.append("phone", formvalues.phone)
    payload.append("address", formvalues.address)
    payload.append("fatherName", formvalues.fatherName)
    payload.append("motherName", formvalues.motherName)
    payload.append("className", formvalues.className)
    payload.append("subjects", formvalues.subjects)
    payload.append("classTeacher", formvalues.classTeacher)
    payload.append("nationality", formvalues.nationality)
    payload.append("dob", formvalues.dob)
    payload.append("gender", formvalues.gender)
    payload.append("photo", formvalues.photo)


    this.service.addStudent(payload).subscribe((data1: any) => {
      if (data1?.status == 200) {
        this.appService.openSnackBar(data1?.msg, 5000)
        this.matDialog.close(data1?.data)
      }
    })
  }

}
