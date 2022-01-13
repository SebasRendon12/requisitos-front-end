import { DatePipe } from "@angular/common";
import { cUser } from "./cUser";

export class cSession {
  user?: cUser = undefined;
  date: Date = new Date();
  expirationDate: Date = this.getExpirationDate();
  isReceiptsActive = false;

  private getExpirationDate(): Date {
    let date: Date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }
}