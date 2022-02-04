import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from './global.service';
import { cItemsMenu } from './models/classes/cItemsMenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  component = this.global.currentComponent;
  componentName = this.global.currentLocation;
  public itemsMenu: cItemsMenu[] = [];
  closeResult: string = "";
  modalOptions: NgbModalOptions;

  constructor(public global: GlobalService,
    public router: Router,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  public setDefaultItems(path: string) {
    var item1 = new cItemsMenu().create(this.global.currentUser.nombre_completo.toUpperCase(), [{ name: "Mi Perfil", routerName: "login" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    this.itemsMenu.push(item1);
    // var item2 = new cItemsMenu().create(undefined, [{ name: "Ingresar", routerName: "login" }]);
    // this.itemsMenu.push(item2);
    this.router.navigate([path]);
  }

  public setItems(items: cItemsMenu[], path: string) {
    this.itemsMenu = items;
    this.router.navigate([path]);
  }

  async logOut() {
    this.setItems([], 'login');
    await this.global.logOut();
  }

  public enablePaymentRecipts(content: any) {
    this.modalService.open(content, this.modalOptions).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        var res = await this.global.makeRequest({
          url: this.global.urls.urlReceipts + "enable",
          spinner: true
        });
        if (res) {
          if (res.success) {
            this.global.toastr.success('Recibos de pago activados', 'Nuevo mensaje');
            var menuItems: cItemsMenu[] = [];
            var item1: cItemsMenu = new cItemsMenu().create(this.global.currentUser.nombre_completo.toUpperCase(), [{ name: "Mi Perfil", routerName: "functionary" }, { name: "Cerrar Sesión", routerName: "logout" }]);
            menuItems.push(item1);
            this.setItems(menuItems, 'functionary');
          }
          else {
            this.global.toastr.error('Comuniquese con el administrador', 'Error al habilitar los recibos de pago', { timeOut: 4000 });
          }
        }
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

  changeUrl(newComponent: string, newComponentName: string) {
    if (newComponent !== undefined && newComponent !== null && newComponent !== "") {
      if (newComponentName !== undefined && newComponentName !== null && newComponentName !== "") {
        this.component = newComponent;
        this.componentName = newComponentName;
      }
    }
  }
}
