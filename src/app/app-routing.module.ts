import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./features/users/users.component";
import {PostsComponent} from "./features/posts/posts.component";

const routes: Routes = [
  {
    path : "",
    redirectTo : "/users",
    pathMatch : "full",
  },
  {
    path : "users",
    component: UsersComponent
  },
  {
    path : "posts",
    component: PostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
