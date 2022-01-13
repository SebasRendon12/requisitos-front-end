import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { cItemsMenu } from '../classes/cItemsMenu';
import { cReceipt } from '../classes/cReceipt';
import { GlobalService } from '../global.service';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-payment-receipts',
  templateUrl: './payment-receipts.component.html',
  styleUrls: ['./payment-receipts.component.scss']
})
export class PaymentReceiptsComponent implements OnInit {

  public lstReceipts: cReceipt[] = [];

  constructor(
    private header: AppComponent,
    private global: GlobalService,
  ) { }

  ngOnInit(): void {
    this.global.validateAccess('estudiante');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "student" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    this.header.setItems(menuItems, 'paymentReceipts');
    var recibo1 = new cReceipt();
    recibo1.id = 135498765;
    recibo1.estado = 'pagado';
    recibo1.anno = 2022;
    recibo1.periodo = 1;
    recibo1.valor = 1564349;
    recibo1.fechaPago = this.createDate(15, 12, 2021);
    recibo1.fechaPagoExtemporaneo = this.createDate(24, 12, 2021);
    recibo1.fechaPagoExitoso = this.createDate(11, 12, 2021);
    recibo1.recibo = '';
    recibo1.porcentajeMora = 5;
    this.lstReceipts.push(recibo1);
    var recibo2 = new cReceipt();
    recibo2.id = 635461684;
    recibo2.estado = 'pendiente';
    recibo2.anno = 2022;
    recibo2.periodo = 1;
    recibo2.valor = 1564349;
    recibo2.fechaPago = this.createDate(15, 1, 2022);
    recibo2.fechaPagoExtemporaneo = this.createDate(24, 1, 2022);
    recibo2.fechaPagoExitoso = this.createDate(11, 1, 2022);
    recibo2.recibo = '';
    recibo2.porcentajeMora = 5;
    this.lstReceipts.push(recibo2);

  }

  createDate(day: number, month: number, year: number): Date {
    var date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    return date;
  }

  printReceipt(index: number) {
    console.log('Imprimir recibo número: ' + index);
  }

  payReceipt(index: number) {
    console.log('Pagar recibo número: ' + index);
  }
}
