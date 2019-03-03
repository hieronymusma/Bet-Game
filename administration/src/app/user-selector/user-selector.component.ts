import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { User } from "../server-interfaces/user";
import { DataService } from "../services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbTypeaheadSelectItemEvent } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-user-selector",
  templateUrl: "./user-selector.component.html",
  styleUrls: ["./user-selector.component.scss"]
})
export class UserSelectorComponent implements OnInit {

  public username = "";
  private selectedUser: User;

  public get user(): User {
    return this.selectedUser;
  }

  private users: Array<User> = [];

  async ngOnInit(): Promise<void> {
    this.spinner.show();
    this.users = await this.dataService.getAllUsers();
    this.spinner.hide();
  }

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) {}

  public itemWasSelected(item: NgbTypeaheadSelectItemEvent) {
    const string: string = item.item;
    const split = string.split(" ");
    this.selectedUser = this.users.find(x => x.guid === split[split.length - 1]);
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term =>
      this.users.filter(v => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1
      || v.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1)
      .map(x => x.firstName + " " + x.lastName + " " + x.guid)
      .slice(0, 10)))
}
