import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { TracketService } from 'src/app/tracknet/services/tracket.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  @Input() student: any
  @Output() gobackbtn = new EventEmitter<any>()
  @ViewChild("changeLogo") changeLogo: any;
  formGroup: FormGroup
  imageUrl: any;
  selectedValues
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

  constructor(private service: TracketService,
    private formBuilder: FormBuilder,
    private appService: AppService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    let text: string = this.student.subjects[0]
    let myArray = text.split(",")
    this.student.subjects = myArray

  }


  goback() { this.gobackbtn.emit("detailPage") }

  numbersOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fileChangeEvent(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    this.student.photo = file

    
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

  onSubmit(formvalues: any) {
    console.log(this.student.className);
    
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
    payload.append("photo", this.student.photo)

    this.service.editStudent(payload,this.student._id).subscribe((data1: any) => {
      console.log(data1);
  
      if (data1?.status == 200) {
        this.appService.openSnackBar(data1?.msg, 5000)
      }
    })
  }
 

}
