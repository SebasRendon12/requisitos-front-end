import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { cItemsMenu } from '../classes/cItemsMenu';
import { cUser } from '../classes/cUser';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  public user: cUser;
  slides = [
    { 'image': '../../assets/images/infografia1.jpg' },
    { 'image': '../../assets/images/infografia2.jpg' },
    { 'image': '../../assets/images/infografia3.jpg' },
    { 'image': '../../assets/images/infografia4.jpg' },
    { 'image': '../../assets/images/infografia5.jpeg' }
  ];

  constructor(
    private header: AppComponent,
    private global: GlobalService
  ) {
    this.user = this.global.currentUser;
  }

  ngOnInit(): void {
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "student" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    var item2: cItemsMenu = new cItemsMenu().create(undefined, [{ name: "Recibos de pago", routerName: "paymentReceipts" }]);
    menuItems.push(item1);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'student');
  }

}
