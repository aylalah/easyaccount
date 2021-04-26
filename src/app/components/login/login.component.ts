import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    username : null,
    // email : null,
    password : null
  }

  public error = null;
  id: string;

  public loggedIn: boolean;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private message: NzMessageService,
              ) { }

  onSubmit(){
    this.id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    this.Jarwis.login(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
     );
  }

  handleResponse(data){
    this.message.remove(this.id);
    // this.Token.handle(data.access_token);
    this.Token.handle(data.data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard').then(() => {window.location.reload();});
    const type = 'success';
    this.message.create(type, `Login Successfull`);
  }

  handleError(error){
    this.message.remove(this.id);
    this.error = error.error.error;
    const type = 'error';
    this.message.create(type, `Error: ${this.error}` );
  }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);
  }

  logout( Event : MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigateByUrl('/login');
  }

}
