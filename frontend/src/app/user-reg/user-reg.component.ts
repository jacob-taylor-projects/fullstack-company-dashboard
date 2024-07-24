import { NgFor } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import FullUserDTO from '../models/FullUserDTO';
import ProfileDTO from '../models/ProfileDTO';
import { post, get } from '../../services/api';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { userInfo } from '../../services/userInfo';

@Component({
  selector: 'app-user-reg',
  standalone: true,
  imports: [NgFor, MatInputModule, MatButtonModule],
  templateUrl: './user-reg.component.html',
  styleUrl: './user-reg.component.css'
})
export class UserRegComponent {

  users: FullUserDTO[] = [{
    id: 2,
    profile: {
      firstname: "FirstName",
      lastname: "LastName",
      email: "email@email.com",
      phone: "000-000-000"
    },
    isAdmin: true,
    active: true,
    status: "Active",
    companies: [],
    teams: []
  }];

  userToAdd: FullUserDTO = {
    id: 3,
    profile: {
      firstname: "Me",
      lastname: "My Last name",
      email: "something111@email.com",
      phone: "020-020-2200"
    },
    isAdmin: false,
    active: false,
    status: "Pending",
    companies: [],
    teams: []
  }
  id: string = "";
  
  constructor(public dialog: MatDialog, private userInfo: userInfo) {}

  ngOnInit(): void {
    this.userInfo.getCompanyID().subscribe((value) => (this.id = value.toString()));
    //getUsers();
  }

  async getUsers() {
    let response = await get("company", [this.id, "users"]);
    if(response) {
      this.users = response;
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(UserRegFormComponent, {
      data: this.userToAdd
    });
    dialogRef.afterClosed().subscribe(result => {
      this.userToAdd = result;
      this.users.push(this.userToAdd);
      //here is were we post the new user
      //let response =  post("company", [id, "user"], this.userToAdd)
    });
  }
}
