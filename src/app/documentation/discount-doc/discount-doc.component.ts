import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/classes/cDocument';
import { cItemsMenu } from 'src/app/classes/cItemsMenu';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-discount-doc',
  templateUrl: './discount-doc.component.html',
  styleUrls: ['./discount-doc.component.scss']
})
export class DiscountDocComponent implements OnInit {

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
      // { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'discountDoc');
    this.loadDocuments();
  }

  private loadDocuments() {
    doc = new cDocument(
      'Descuento para los hijos y cónyuges del personal pensionado o de planta vinculados a la Universidad Nacional de Colombia en cualquiera de sus Sedes.',
      'Esta información debe ser consignada en el formulario de registro de admitidos y debe anexar certificación laboral. NOTA: Este descuento no aplica para los hijos o cónyuges de los docentes con vinculación como docente ocasional.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Descuento para admitidos con hermanos estudiantes de pregrado en la Universidad Nacional de Colombia.',
      'Registrar el número de documento de identificación del hermano en el formulario de registro FORE (que será habilitado en fecha informada el día de la publicación de los resultados), lo debe ingresar seleccionando el ítem respectivo. Regístrelo como hermano, y en el campo Profesión u oficio del formulario escriba la sede donde estudia, por ejemplo: Estudiante UN–Bogotá, UN-Arauca, UN-Leticia, UN-Manizales, UN-Medellín, UN-Palmira, UN-San Andrés, UN-Tumaco y UN-La Paz. En caso de que ambos hermanos sean admitidos de la misma convocatoria, debe anexar carta, donde se indique esta información.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
    var doc = new cDocument(
      'Descuento Electoral del 10% aplicado sobre el concepto matrícula.',
      'El certificado válido para este descuento corresponde a los comicios del 27 de octubre de 2019. NOTA: Únicamente es válido el certificado electoral del admitido, no es válido el certificado de los responsables del admitido.',
      1,
      ['.pdf'],
      false
    );
    this.documents.push(doc);
    var doc = new cDocument(
      'Descuento por ser hijo de personal pensionado o de planta vinculados a la Universidad de Antioquia.',
      'Debe anexar certificación laboral. Al momento de solicitarla debe especificar que es para ser entregada en la Universidad Nacional de Colombia. NOTA: Este descuento no aplica para los hijos de los docentes con vinculación como docente ocasional, ni tampoco aplica para los hijos de los empleados administrativos en nombramiento provisional.',
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
