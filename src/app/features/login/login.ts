import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login-component/login-component';

@Component({
  selector: 'app-login',
  imports: [LoginComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
