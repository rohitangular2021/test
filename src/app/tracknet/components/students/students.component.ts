import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogboxComponent } from 'src/app/shared/components/confirm-dialogbox/confirm-dialogbox.component';
import { FetchStudentsAction } from '../../actions/tracknet.students.actions';
import { StudentsSelector } from '../../reducers/students.selector';
import { TracketService } from '../../services/tracket.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { ShareStudentComponent } from './share-student/share-student.component';
import { BulkuploadstudentsComponent } from './bulkuploadstudents/bulkuploadstudents.component';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  subscriptions$: Subscription = new Subscription();
  students: any[]
  selectedStudents: any[] = []
  searchKey: any = ''
  isSpinner:boolean =  true
  student:any
  selectedView = "detailPage"
 
  constructor(private store: Store, private service: TracketService,
    public appService:AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchStudentsAction())
    setTimeout(() => {
      this.subscriptions$.add(
        this.store
          .select(StudentsSelector)
          .pipe(debounceTime(100))
          .subscribe((allstudents: any) => {
           this.students = allstudents.data 
           this.isSpinner = false
          })
      );
    }, 2000);
  }

  clearSearch() {
    this.searchKey = ''
  }

  loadStudent(data){
    this.student=data.student
    this.selectedView = data.selectedView 
  }

  studentChecked(event: any) {
    if (this.selectedStudents.includes(event)) {
      this.selectedStudents.forEach((element, index) => {
        if (element == event) {
          this.selectedStudents.splice(index, 1)
        }
      })
    }
    else { this.selectedStudents.push(event) }
  }

  allStudentChecked(data:any){
    if(data.ischecked){
      this.selectedStudents = []
      this.students.forEach((item,index)=>{
      this.selectedStudents.push(item._id)
      })
    }else{
      this.selectedStudents = []
    }
      
  }


  uploadCsv()
  {
    const dialogRef = this.dialog.open(BulkuploadstudentsComponent, {
      maxWidth: "100vw",
      maxHeight:"100vh",
      data: {}
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){
      }
    }); 
  }

  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogRef = this.dialog.open(ConfirmDialogboxComponent, {
      maxWidth: "400px",
      data: {
        title:"confirm delete",
        message:message
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){
        this.bulkDelete()
      }
    });
  }

  changeView(event){
    this.selectedView = event 
  }

  downloadOrShareReports(){
   let  dtStudents :any;
   dtStudents= this.students.map(item=>{
        return {
          name:item.name,
          email:item.email,
          phone:item.phone.toString(),
          class:item.className
        }
   })
   

   let csvOptions = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Your Holiday List :',
      useBom: true,
      noDownload: false,
      headers: ["Name", "Email", "Phone", "class"]
    };
    new  AngularCsv(dtStudents, "StudentsList", csvOptions);
  }

  shareVia(string) {
    const dialog = this.dialog.open(ShareStudentComponent, {
      maxHeight:'100vh',
      maxWidth:'100vw',
      data: { shareVia:string,}
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        
      }
    });
  }

  bulkDelete(){
    this.service.deleteBulkStudents(this.selectedStudents).subscribe((students)=>{
      if(students.status==200){
        this.loadStudents(students.data)
        this.appService.openSnackBar(students.msg,5000)
      }
    })    
  }

  addStudent(){
    const dialogRef = this.dialog.open(AddStudentComponent, {
      maxWidth: "100vw",
      maxHeight:"100vh",
    });
    dialogRef.afterClosed().subscribe(dialogResult => {  
      if(dialogResult){this.loadStudents(dialogResult)
        dialogRef.close()
      }else{
      dialogRef.close()
      }
    });
  }

  loadStudents(data) {
    this.students = data
  }

}
