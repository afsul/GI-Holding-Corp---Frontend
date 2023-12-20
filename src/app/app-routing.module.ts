import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { HomeComponent } from './home/home.component';
import { ViewNoteComponent } from './view-note/view-note.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'SignIn', component: SignInComponent },
  { path: 'ViewNote/:noteId', component: ViewNoteComponent },
  { path: 'AddNote', component: AddNoteComponent },
  { path: 'EditNote/:noteId', component: EditNoteComponent } 
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }