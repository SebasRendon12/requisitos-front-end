import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { cDocument } from 'src/app/models/classes/cDocument';
import { GlobalService } from 'src/app/global.service';
import { cItemsMenu } from 'src/app/models/classes/cItemsMenu';

@Component({
  selector: 'app-special-doc',
  templateUrl: './special-doc.component.html',
  styleUrls: ['./special-doc.component.scss']
})
export class SpecialDocComponent implements OnInit {

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
      { name: "Documentación personal", routerName: "personalDoc" },
      { name: "Documentación de padre y madre", routerName: "parentsDoc" },
      { name: "Documentación para aplicar a descuento", routerName: "discountDoc" },
      // { name: "Documentación de casos especiales", routerName: "specialDoc" }
    ]);
    menuItems.push(item2);
    this.header.setItems(menuItems, 'specialDoc');
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

  cancelDocs() {
    this.global.router.navigate(['admitted']);
  }

  saveForLaterDocs() {
    this.global.router.navigate(['admitted']);
  }
}
