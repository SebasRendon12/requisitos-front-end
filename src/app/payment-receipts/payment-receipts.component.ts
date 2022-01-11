import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { cItemsMenu } from '../classes/cItemsMenu';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-payment-receipts',
  templateUrl: './payment-receipts.component.html',
  styleUrls: ['./payment-receipts.component.scss']
})
export class PaymentReceiptsComponent implements OnInit {

  constructor(
    private header: AppComponent,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "student" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    this.header.setItems(menuItems, 'paymentReceipts');
  }

}
