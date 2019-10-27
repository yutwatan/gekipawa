import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async addUser(addTeamForm: FormGroup) {
    console.log('addUser() called!');
    return {
      id: 9999
    };
  }
}
