import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { cItemsMenu } from '../classes/cItemsMenu';
import { cUser } from '../classes/cUser';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-admitted',
  templateUrl: './admitted.component.html',
  styleUrls: ['./admitted.component.scss']
})
export class AdmittedComponent implements OnInit {

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
    this.global.validateAccess('admitido');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "admitted" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    var item2: cItemsMenu = new cItemsMenu().create('Documentación socioeconómica', [
      { name: "Documentación personal", routerName: "personalDoc" },
      { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'admitted');
  }
}
