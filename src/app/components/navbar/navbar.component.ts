import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean;
  isCollapsed = false;
  profResponds: any;
  me: any;
  firstname: any;
  lastname: any;
  job: any;
  Role: any;
  public admin: boolean;

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
    this.reload();
    this.Auth.authStatus.subscribe(Value => this.loggedIn = Value);

    this.Jarwis.myProfile().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.firstname = this.me.first_name;
        this.lastname = this.me.last_name;
        this.job = this.me.job_title;
        this.Role = this.me.role;
        if (this.Role === 'admin') {
          this.admin = true;
        } else {
          this.admin = false;
        }
      }
    );

    let token = localStorage.getItem("token");

    if (this.tokenExpired(token)){
      this.Token.remove();
      this.Auth.changeAuthStatus(false);
      localStorage.removeItem('reload');
      this.router.navigateByUrl('/login');
    }

    $('#item_search').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#item tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  reload(){
     if (localStorage.getItem('reload') === 'true') {

     } else {
       localStorage.setItem('reload', 'true')
       window.location.reload();
     }
   }

  logout( Event : MouseEvent) {
    Event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    localStorage.removeItem('reload');
    this.router.navigateByUrl('/login');
  }


}
