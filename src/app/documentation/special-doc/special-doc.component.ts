import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/classes/cDocument';
import { cItemsMenu } from 'src/app/classes/cItemsMenu';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-special-doc',
  templateUrl: './special-doc.component.html',
  styleUrls: ['./special-doc.component.scss']
})
export class SpecialDocComponent implements OnInit {

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
      { name: "Documentación personal", routerName: "personalDoc" },
      { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      // { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'specialDoc');
    this.loadDocuments();
  }

  private loadDocuments() {
    var doc = new cDocument(
      'Divorcio o separación de padres',
      'Anexar la Fotocopia de la Escritura Pública; Sentencia de la Disolución y Liquidación de la Sociedad Conyugal o Patrimonial; o Fotocopia de la Demanda de Alimentos, en la cual se indique la cuota alimentaria aprobada.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
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
