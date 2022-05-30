import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatappComponent } from "./components/chatapp/chatapp.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MapComponent } from "./components/map/map.component";

import { ProfileComponent } from "./components/profile/profile.component";
import { AccountSettingComponent } from "./components/settings/account-setting/account-setting.component";
import { PrivacySettingComponent } from "./components/settings/privacy-setting/privacy-setting.component";
import { StudentsComponent } from "./components/students/students.component";
import { UsersComponent } from "./components/users/users.component";
import { TracknetComponent } from "./tracknet.component";

const routes: Routes = [
  {
    path: "",
    component: TracknetComponent,
    children: [
      {
        path: "",
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: "dashboard",
        pathMatch: 'full',
        component: DashboardComponent,
      },
      {
        path: "profile",
        pathMatch: 'full',
        component: ProfileComponent,
      }, 
      {
        path: "users",
        pathMatch: 'full',
        component: UsersComponent,
      },
      {
        path: "students",
        pathMatch: 'full',
        component: StudentsComponent,
      },
      {
        path: "learning/map",
        pathMatch: 'full',
        component: MapComponent,
      },
      {
        path: "learning/chatApp",
        pathMatch: 'full',
        component: ChatappComponent,
      },
      {
        path: "Settings/account",
        pathMatch: 'full',
        component: AccountSettingComponent,
      },
      {
        path: "Settings/privacy",
        pathMatch: 'full',
        component: PrivacySettingComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracknetRoutingModule { }
