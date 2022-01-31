import { cUser } from "./cUser";

export class cSession {
  user?: cUser = undefined;
  fecha: Date = new Date();
  id: number = 0;
  usuario_id?: number = undefined;
  expirationDate: Date = this.getExpirationDate();
  // isPaymentReceiptsEnable: boolean = false;

  private getExpirationDate(): Date {
    let date: Date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }
}