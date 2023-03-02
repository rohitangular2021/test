import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("../app/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    loadChildren: () =>
    import("../app/homesite/homesite.module").then((m) => m.HomesiteModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("../app/homesite/homesite.module").then((m) => m.HomesiteModule),
  },
  {
    path: "tracknet",
    canActivate:[AuthGuard], 
    loadChildren: () =>
      import("../app/tracknet/tracknet.module").then((m) => m.TracknetModule),
  },
  // wild card routing
  { path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
