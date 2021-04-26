import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loggedIn: boolean;
  isCollapsed = false;
  title;
  profResponds: Object;
  me: Object;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private Jarwis: JarwisService
  ) {

  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor(( new Date).getTime() / 1000)) >= expiry;
  }

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
      });

    const token = localStorage.getItem('token');

    if (this.tokenExpired(token)){
      this.Token.remove();
      this.Auth.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
    }
  }

  logout( Event: MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigateByUrl('/login');
  }

}
