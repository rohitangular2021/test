import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracknetComponent } from './tracknet.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TracknetRoutingModule } from './tracknet-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TracketService } from './services/tracket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { UsersComponent } from './components/users/users.component';
import { UserItemComponent } from './components/users/user-item/user-item.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/tracknet.users.effects';
import { TracknetPipe, SelectedEntity, searchUser, searchStudent, searchOperator } from './pipes/tracknet.pipe';
import { sharedModule } from '../shared/shared.module';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { DashboardCardComponent } from './components/dashboard/dashboard-card/dashboard-card.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentsEffects } from './effects/tracknet.students.effects';
import { StudentItemComponent } from './components/students/student-item/student-item.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { EditStudentComponent } from './components/students/edit-student/edit-student.component';
import { ShareStudentComponent } from './components/students/share-student/share-student.component';
import { ViewStudentComponent } from './components/students/view-student/view-student.component';

import { ProfileComponent } from './components/profile/profile.component';
import { MapComponent } from './components/map/map.component';
import { LeafletMapService } from './services/leaflet-map.service';
import { ScriptLoaderService } from './script-loader.service';
import { DashboardEffects } from './effects/tracknet.dahboard.effects';
import { BulkuploadstudentsComponent } from './components/students/bulkuploadstudents/bulkuploadstudents.component';
import { ChatappComponent } from './components/chatapp/chatapp.component';

import { ChatService } from './services/chat.service';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountSettingsComponent } from './components/settings/account-settings/account-settings.component';
import { PrivacySettingsComponent } from './components/settings/privacy-settings/privacy-settings.component';
import { UiSettingsComponent } from './components/settings/ui-settings/ui-settings.component';
import { SecuritySettingsComponent } from './components/settings/security-settings/security-settings.component';
import { NotificationSettingsComponent } from './components/settings/notification-settings/notification-settings.component';
import { SettingsEffects } from './effects/tracknet.settings.effects';
import { ResizableDirective } from './directives/resizable.directive';
import { AssignmentComponent } from './components/assignment/assignment.component';

@NgModule({
  declarations: [
    TracknetComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DashboardComponent,
    UsersComponent,
    UserItemComponent,
    TracknetPipe, SelectedEntity, searchUser, searchStudent, searchOperator,
    AddUserComponent, EditUserComponent, DashboardCardComponent,
    StudentsComponent, StudentItemComponent, AddStudentComponent,
    EditStudentComponent,
    ShareStudentComponent,AssignmentComponent,
    ViewStudentComponent, ProfileComponent, MapComponent, BulkuploadstudentsComponent, ChatappComponent, RxjsComponent, SettingsComponent, AccountSettingsComponent, PrivacySettingsComponent, UiSettingsComponent, SecuritySettingsComponent, NotificationSettingsComponent, ResizableDirective
  ],
  imports: [
    CommonModule, RouterModule, MaterialModule, TracknetRoutingModule, FormsModule, ReactiveFormsModule,
    EffectsModule.forFeature([UsersEffects, StudentsEffects, DashboardEffects,SettingsEffects]), sharedModule
  ],
  providers: [TracketService, AppService, LeafletMapService, ScriptLoaderService, ChatService]
})
export class TracknetModule { }
 