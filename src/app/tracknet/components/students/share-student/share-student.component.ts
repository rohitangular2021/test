import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { TracketService } from 'src/app/tracknet/services/tracket.service';

@Component({
  selector: 'app-share-student',
  templateUrl: './share-student.component.html',
  styleUrls: ['./share-student.component.css']
})
export class ShareStudentComponent implements OnInit {

  shareVia: string = "email";
  message: string;
  emails: string[] = [];
  mobileNumber: string = null;
  proceedbtn: boolean = false;
  shareInfoScreen: boolean = false;
  restrictSend: boolean = false;
  serviceSubscription$: Subscription = new Subscription();
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shareVia: string },
    private matDialogRef: MatDialogRef<ShareStudentComponent>,
    public appService: AppService,
    public tracknet:TracketService
  ) {}

  ngOnInit(): void {
    this.shareVia = this.data.shareVia
    if (!this.emails.length) this.addEmail();
  }

  trackByIdx(index: number): any {
    return index;
  }

  onInputChange(event: any, index: number) {
    this.emails[index] = event.target.value;
    let validemail = this.validateEmail(event.target.value);
    this.proceedbtn = validemail;
  }

  validateEmail(email: string): boolean {
    let reg =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
  }

  numbersOnly(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  removeEmail = (index: number) => {
    this.emails.splice(index, 1);
    this.proceedbtn = true;
  };
  
  proceedScreens = () => {
    this.shareInfoScreen = true;
    this.emails = this.emails.filter(
      (email) => email && this.validateEmail(email)
    );
  };

  addEmail() {
    this.emails = [...this.emails, ...new Array<string>(1)];
    this.proceedbtn = false;
  }
  
  close = () => this.matDialogRef.close();
  ngOnDestroy = () => this.serviceSubscription$.unsubscribe();

  proceed(){
    this.shareInfoScreen = true
  }

  send(){
    this.close()
      let data = {
        msg:this.message,
        emails:this.emails
      }
      
      this.tracknet.sendMail(data).subscribe((data:any)=>{
        console.log(data);
        
        this.close()
        this.appService.openSnackBar(data.msg,5000)
      })
  }
}
