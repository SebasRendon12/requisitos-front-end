import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/classes/cDocument';
import { cItemsMenu } from 'src/app/classes/cItemsMenu';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-parents-doc',
  templateUrl: './parents-doc.component.html',
  styleUrls: ['./parents-doc.component.scss']
})
export class ParentsDocComponent implements OnInit {

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
      // { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'parentsDoc');
    this.loadDocuments();
  }

  private loadDocuments() {
    doc = new cDocument(
      'Empleados y pensionados NO obligados a declarar renta.',
      'Certificado de Ingresos y Retenciones: Año gravable 2020; expedido por la empresa del contratante y FIRMADO por el empleado o pensionado. No aplican certificaciones laborales o soportes de pago. NOTA: Los certificados requieren firma del empleado, en caso contrario, se excluyen de la documentación para la asignación del PBM, es decir, se aplica el puntaje máximo en este indicador. Si es pensionado: Certificación expedida por el fondo de pensión, que especifique el valor total de los ingresos del año gravable 2020 o los dos (2) últimos comprobantes de pago. Si el responsable socioeconómico estuvo desempleado durante el año 2020, pero actualmente se encuentra laborando: Carta que explique la situación y certificación laboral, que indique fecha de ingreso, salario devengado y soportes de pago del año en curso.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Trabajadores independientes NO obligados a declarar renta (NO SE RECIBEN DECLARACIONES EXTRAJUICIO O CARTAS LABORALES CERTIFICADAS POR CONTADORES PÚBLICOS).',
      'Formato para personas naturales No Declarantes Año gravable 2020: Aplica para trabajadores independientes NO OBLIGADOS A DECLARAR Y QUE NO POSEAN CERTIFICADO DE INGRESOS, firmado y relacionando las personas a cargo. Este documento lo podrá descargar de la página Web: http://registroymatricula.medellin.unal.edu.co/index.php/formatos En caso de que realice el pago de la seguridad como independiente, deberá además enviar fotocopia de la última planilla de pago cancelada, donde se pueda verificar el tipo de aportante. En caso de realizar el pago de la seguridad social por medio de una empresa o tercero, debe enviar la carta expedida por la empresa o tercero, dónde se indique que no existe ningún vínculo laboral.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
    var doc = new cDocument(
      'Personas obligadas a declarar renta',
      'Declaración de renta del año gravable 2019 (presentada en el año 2020). NOTA: Los formularios requieren sello electrónico de la DIAN, en caso contrario, se excluyen de la documentación para la asignación del PBM, es decir, se aplica el puntaje máximo en este indicador',
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
