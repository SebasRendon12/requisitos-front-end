import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/models/classes/cDocument';
import { GlobalService } from 'src/app/global.service';
import { cItemsMenu } from 'src/app/models/classes/cItemsMenu';

@Component({
  selector: 'app-personal-doc',
  templateUrl: './personal-doc.component.html',
  styleUrls: ['./personal-doc.component.scss']
})
export class PersonalDocComponent implements OnInit {

  documents: cDocument[] = [];
  closeResult: string = "";
  modalOptions: NgbModalOptions;

  constructor(
    private global: GlobalService,
    private header: AppComponent,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {
    this.global.validateAccess('admitido');
    var menuItems: cItemsMenu[] = [];
    var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.nombre_completo.toUpperCase(), [{ name: "Mi Perfil", routerName: "admitted" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    menuItems.push(item1);
    var item2: cItemsMenu = new cItemsMenu().create('Documentación socioeconómica', [
      // { name: "Documentación personal", routerName: "personalDoc" },
      { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'personalDoc');
    this.loadDocuments();
  }

  public saveDocs(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.global.toastr.success('Documentos enviados exitosamente', 'Enviado');
        this.global.router.navigate(['admitted']);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private loadDocuments() {
    var doc = new cDocument(
      'Constancia y autorización de notificación por correo electrónico y tratamiento de datos personales.',
      'Diligenciada y firmada por el admitido. Este documento lo podrá descargar de la página Web: http://registroymatricula.medellin.unal.edu.co/index.php/formatos',
      1,
      ['.pdf'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Fotocopia legible del documento de identidad vigente.',
      'Ampliada al 150%.',
      1,
      ['.pdf'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Una (1) fotografía reciente FONDO BLANCO a color 3x4.',
      'Esta fotografía de manera digital, la debe adjuntar en el Formulario de Registro FORE. La foto debe cumplir con las siguientes especificaciones: Tomada de frente, Sin gorra, Sin piercing, Sin lentes oscuros, A color (173px de ancho x 236px de alto) con FONDO BLANCO, La foto no deberá estar deteriorada o poseer recuadro blanco, Formato JPG, Modo de color RGB, Menor a 1 Megabyte, NO cargar fotografías escaneadas.',
      1,
      ['.jpg'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Fotocopia del Registro Civil de Nacimiento.',
      'Con parentesco (nombre de los padres).',
      1,
      ['.pdf'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Fotocopia del resultado de las pruebas Saber 11.',
      'Se puede descargar e imprimir de la página Web del ICFES. https://www.icfes.gov.co',
      1,
      ['.pdf'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Fotocopia del acta de grado o diploma de bachiller',
      'Donde se indica que posee el título de bachiller.',
      1,
      ['.pdf'],
      true
    );
    this.documents.push(doc);
    doc = new cDocument(
      'Certificación obligatoria- SÓLO para los admitidos por el Programa Especial para la Admisión de Bachilleres de Población Negra, Afrocolombiana, Palenquera y Raizal.',
      'Certificado como miembro de la Población Afrocolombiana que expide el Ministerio del Interior',
      1,
      ['.pdf'],
      true
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

  cancelDocs() {
    this.global.router.navigate(['admitted']);
  }

  saveForLaterDocs() {
    this.global.router.navigate(['admitted']);
  }
}
