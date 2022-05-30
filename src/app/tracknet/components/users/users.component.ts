import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogboxComponent } from 'src/app/shared/components/confirm-dialogbox/confirm-dialogbox.component';
import { FetchUsersAction } from '../../actions/tracknet.users.actions';
import { UsersSelector } from '../../reducers/users.selector';
import { TracketService } from '../../services/tracket.service';
import { AddUserComponent } from './add-user/add-user.component';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  subscriptions$: Subscription = new Subscription();
  users: any[]
  selectedUsers: any[] = []
  searchKey: any = ''
  isSpinner:boolean = true
  constructor(private store: Store, private service: TracketService,
    private appService:AppService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchUsersAction())
   setTimeout(() => {
    this.subscriptions$.add(
      this.store
        .select(UsersSelector)
        .pipe(debounceTime(100))
        .subscribe((allusers: any) => {
          this.users = allusers.data
          this.isSpinner = false
        })
    );
   }, 2000);
 
  }

  trackByFn(index, item) {
    return item.name // or item.id
  }

  userChecked(event: any) {
    if (this.selectedUsers.includes(event)) {
      this.selectedUsers.forEach((element, index) => {
        if (element == event) {
          this.selectedUsers.splice(index, 1)
        }
      })
    }
    else { this.selectedUsers.push(event) }
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

  bulkDelete() {
    this.service.deleteBulkUsers(this.selectedUsers).subscribe((data1:any) => {
      if(data1?.status == 200){
        this.appService.openSnackBar(data1.msg,5000)
        this.users= data1.data
        this.selectedUsers = []
      }
      else{
        this.appService.openSnackBar(data1.msg,5000)
      }

    })
  }

  downloadOrShareReports(){
    let  dtStudents :any;
    dtStudents= this.users.map(item=>{
         return {
           name:item.name,
           email:item.email,
           phone:item.phone.toString(),
         }
    })
    
 
    let csvOptions = {
       fieldSeparator: ',',
       quoteStrings: '"',
       decimalseparator: '.',
       showLabels: true,
       showTitle: false,
       title: 'Your Users List :',
       useBom: true,
       noDownload: false,
       headers: ["Name", "Email", "Phone"]
     };
     new  AngularCsv(dtStudents, "UsersList", csvOptions);
   }

  addUser(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      maxWidth: "100vw",
      maxHeight:"100vh",
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult)this.loadUsers(dialogResult)
    });
  }

  loadUsers(data) {
    this.users = data
  }

  clearSearch() {
    this.searchKey = ''
  }

}
