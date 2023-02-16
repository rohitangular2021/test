import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssignmentComponent } from "./components/assignment/assignment.component";
import { ChatappComponent } from "./components/chatapp/chatapp.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MapComponent } from "./components/map/map.component";

import { ProfileComponent } from "./components/profile/profile.component";
import { RxjsComponent } from "./components/rxjs/rxjs.component";
import { SettingsComponent } from "./components/settings/settings.component";
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
        path: "assignment",
        pathMatch: 'full',
        component: AssignmentComponent,
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
        path: "learning/rxjs",
        pathMatch: 'full',
        component: RxjsComponent,
      },
      {
        path: "settings",
        pathMatch: 'full',
        component: SettingsComponent,
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracknetRoutingModule { }
