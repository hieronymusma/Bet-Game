import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { User } from "../server-interfaces/user";
import { DataService } from "../services/data.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-selector",
  templateUrl: "./user-selector.component.html",
  styleUrls: ["./user-selector.component.scss"]
})
export class UserSelectorComponent implements OnInit {

  public username = "";

  public get user(): User {
    const filteredUsers = this.users.filter(v => v.firstName.toLowerCase().includes(this.username.toLowerCase())
    || v.lastName.toLowerCase().includes(this.username.toLowerCase()));

    if (filteredUsers.length === 1) {
      return filteredUsers[0];
    }
  }

  private users: Array<User> = [];

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.users = await this.dataService.getAllUsers();
    this.spinner.hide();
  }

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.users.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
      || v.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1)
      .map(x => x.firstName + " " + x.lastName)
      .slice(0, 10)))
}
