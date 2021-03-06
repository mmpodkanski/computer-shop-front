import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private injector: Injector,
    private navbar: AppComponent,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.navbar.ngOnInit();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    // const notifier = this.injector.get(NotificationService);

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token); //token
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;

        this.navbar.ngOnInit();
        this.router.navigate([`/products`]);
        
        // notifier.showSuccess('Sukces!');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
