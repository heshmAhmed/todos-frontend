import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './service/auth.guard';
import { SignUpComponent } from './signup/signup.component';
import { TodosListComponent } from './todos-list/todos-list.component';

const routes: Routes = [
  { path: 'todos', component: TodosListComponent },
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
