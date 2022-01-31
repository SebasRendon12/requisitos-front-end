import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GlobalService } from '../global.service';
import { cItemsMenu } from '../models/classes/cItemsMenu';
import { cUser } from '../models/classes/cUser';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

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
    this.global.validateAccess('estudiante');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.nombre_completo.toUpperCase(), [{ name: "Mi Perfil", routerName: "student" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    // if (this.global.currentSession.isPaymentReceiptsEnable) {
    //   var item2: cItemsMenu = new cItemsMenu().create(undefined, [{ name: "Recibos de pago", routerName: "paymentReceipts" }]);
    //   menuItems.push(item2);
    // }
    this.header.setItems(menuItems, 'student');
  }

}
