import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'keycloak-implementation';
  user: any;

  constructor(private router: Router, private auth: KeycloakService) { }

  ngOnInit(): void {
    this.loadProfile().then(user => {
      console.log(user);
      this.user = user;
    })
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.auth.logout();
  }

  loadProfile(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (await this.auth.isLoggedIn()) {
        this.auth.loadUserProfile()
          .then(data => resolve(data))
          .catch(err => console.log(err))
      } else {
        console.log('user not logged in');
      }
    })
  }


}
