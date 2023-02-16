import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogboxComponent } from 'src/app/shared/components/confirm-dialogbox/confirm-dialogbox.component';
import { TracketService } from 'src/app/tracknet/services/tracket.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})

export class StudentItemComponent implements OnInit {

  @Output() checked = new EventEmitter<any>();
  @Output() allChecked = new EventEmitter<any>();
  @Output() student = new EventEmitter<any>();
  @Output() delStudent = new EventEmitter<any>();

  displayedColumns = ['Student_Id', 'Name', 'Email', 'Phone', 'classTeacher', 'actions'];
  dataSource:MatTableDataSource<any>; ;
  subscriptions$: Subscription = new Subscription();
  @Input() students: any[]
  @Input() selectedStudents: any[] = []
  @Input() searchKey:string
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TracketService,
    private appService: AppService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  studentChecked(event: any) {
     this.checked.emit(event)    
  }

  confirmDialog(id:any): void {
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
        this.delete(id)
      }
    });
  }

  delete(id:any){
    this.service.deleteStudent(id).subscribe((students:any)=>{
     if(students?.status==200){
      this.delStudent.emit(students.data)
       this.appService.openSnackBar(students.msg,5000)    
     }
    })
  }

  selectAll(event){
     let data = {
      ischecked:event.checked,
      allStudents:this.students
    }
    this.allChecked.emit(data)   
  }

  edit(data) {
   let obj = {
      student:data,
      selectedView:"editpageview"
    }
    this.student.emit(obj)
  }


}
