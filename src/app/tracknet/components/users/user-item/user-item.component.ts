import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogboxComponent } from 'src/app/shared/components/confirm-dialogbox/confirm-dialogbox.component';
import { AppService } from '../../../../app.service';
import { TracketService } from '../../../services/tracket.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
@Input() userdata:any
@Input() selectedUsers:any
@Output() checked = new EventEmitter<any>();
@Output() users = new EventEmitter<any>();
 constructor(private service:TracketService,
  private appService:AppService,
  public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  itemChecked = (event: any) => this.checked.emit(event);


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
    this.service.deleteUser(id).subscribe((users:any)=>{
     if(users?.status==200){
      this.users.emit(users.data)
       this.appService.openSnackBar(users.msg,5000)    
     }
    })
  }

  edit(data:any){
    this.service.editUser(data).subscribe(data=>{
      console.log(data);    
  })
    
  }

}
