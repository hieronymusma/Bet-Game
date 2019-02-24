import { Pipe, PipeTransform } from "@angular/core";
import { UserStatus } from "./server-interfaces/user-status";

@Pipe({
  name: "sort"
})
export class SortPipe implements PipeTransform {

  transform(value: Array<UserStatus>): Array<UserStatus> {
    return value.sort(this.compareFunction);
  }

  private compareFunction(a: UserStatus, b: UserStatus): number {
    return b.user.saldo - a.user.saldo;
  }
}
