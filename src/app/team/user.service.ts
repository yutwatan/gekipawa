import { Injectable } from '@angular/core';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendApiConfig = this.configService.get('backend_api');
  globalConfig = this.configService.get('global');

  constructor(
    private configService: ConfigService,
    private http: HttpClient,
  ) { }

  /**
   * Authentication for user
   * @param username user name
   * @param password password
   */
  async authentication(username: string, password: string) {
    const url = this.backendApiConfig.baseurl + '/users';

    try {
      const users: any = await this.http.get(url).toPromise();

      for (const user of users) {
        if (user.name === username && user.password === password) {
          return user.team.id;
        }
      }
    }
    catch (e) {
      console.log(e);
    }

    return 0;
  }

  /*
  async addUser(addTeamForm: FormGroup) {
    console.log('addUser() called!');
    const userInfo = {
      name: addTeamForm.get('owner').value,
      password: addTeamForm.get('password').value,
    };
    console.log(userInfo);

    return {
      id: 9999
    };
  }
   */
}
