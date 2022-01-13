import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/classes/cDocument';
import { cItemsMenu } from 'src/app/classes/cItemsMenu';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-personal-doc',
  templateUrl: './personal-doc.component.html',
  styleUrls: ['./personal-doc.component.scss']
})
export class PersonalDocComponent implements OnInit {


  documents: cDocument[] = [];
  constructor(
    private global: GlobalService,
    private header: AppComponent
  ) { }

  ngOnInit(): void {
    this.global.validateAccess('admitido');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "admitted" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    var item2: cItemsMenu = new cItemsMenu().create('Documentación socioeconómica', [
      { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'personalDoc');
    this.loadDocuments();
  }

  private loadDocuments() {
    var doc1 = new cDocument(
      'Constancia y autorización de notificación por correo electrónico y tratamiento de datos personales.',
      'Diligenciada y firmada por el admitido. Este documento lo podrá descargar de la página Web',
      1,
      ['.pdf']
    );
  }

  uploadFile(index: number, event: any) {
    var files = event.target.files;
    console.log('Añadir documento: ' + (index + 1));
  }

  editDoc(index: number) {
    console.log('Modificar documento: ' + (index + 1));
  }

  deleteDoc(index: number) {
    console.log('Eliminar documento: ' + (index + 1));
  }



}
