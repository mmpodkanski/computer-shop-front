import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'computer-shop-front';
  role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  search: string;

constructor(
  private tokenStorageService: TokenStorageService,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  searchProduct(): void {
    this.router.navigate(['/products'], {queryParams: {search: this.search}});
  }


  logout(): void {
    this.tokenStorageLogout();
    window.location.reload();
  }

  tokenStorageLogout(): void {
    this.tokenStorageService.signOut();
  }

  
}
