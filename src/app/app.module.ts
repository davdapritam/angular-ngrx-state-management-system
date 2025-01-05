import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostsComponent} from './features/posts/posts.component';
import {UsersComponent} from './features/users/users.component';
import {CommonModule} from "@angular/common";
import {HeaderComponent} from './common/components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {UserListComponent} from './features/users/user-list/user-list.component';
import {UserCardComponent} from './features/users/user-card/user-card.component';
import {HttpClientModule} from "@angular/common/http";
import {AddUpdateUserComponent} from './features/users/add-update-user/add-update-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from '@ngrx/store';
import {HttpService} from "./services/http-service";
import {rootReducer} from "./core/reducers";
import {UserHandler} from "./core/handlers/user-handler";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UsersComponent,
    HeaderComponent,
    UserListComponent,
    UserCardComponent,
    AddUpdateUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule, MatCardModule, MatProgressSpinnerModule,
    MatIconModule, MatFormFieldModule, MatDialogModule, MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(rootReducer),
  ],
  providers: [HttpService, UserHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
