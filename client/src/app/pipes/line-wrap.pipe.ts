import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "lineWrap"
})
export class LineWrapPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
        value = value.replace(/(?:\\r\\n|\\r|\\n)/g, "\n");
        return value;
    } else {
        return "";
    }
}

}
