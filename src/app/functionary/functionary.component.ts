import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { cItemsMenu } from '../classes/cItemsMenu';
import { cUser } from '../classes/cUser';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-functionary',
  templateUrl: './functionary.component.html',
  styleUrls: ['./functionary.component.scss']
})
export class FunctionaryComponent implements OnInit {

  public user: cUser;
  slides = [
    { 'image': '../../assets/images/infografia1.png' },
    { 'image': '../../assets/images/infografia2.png' },
    { 'image': '../../assets/images/infografia3.png' },
    { 'image': '../../assets/images/infografia4.png' },
    { 'image': '../../assets/images/infografia5.png' }
  ];

  constructor(
    private header: AppComponent,
    private global: GlobalService
  ) {
    this.user = this.global.currentUser;
  }

  ngOnInit(): void {
    this.global.validateAccess('funcionario');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "functionary" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    // var item2: cItemsMenu = new cItemsMenu().create(undefined, [{ name: "Recibos de pago", routerName: "paymentReceipts" }]);
    // menuItems.push(item2);
    this.header.setItems(menuItems, 'functionary');
  }
}