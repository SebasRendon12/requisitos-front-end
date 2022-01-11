import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cItemsMenu } from './classes/cItemsMenu';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  component = this.global.currentComponent;
  componentName = this.global.currentLocation;
  public itemsMenu: cItemsMenu[] = [];

  constructor(public global: GlobalService,
    public router: Router) { }

  public setDefaultItems(path: string) {
    var item1 = new cItemsMenu().create(this.global.currentUser.name.toUpperCase(), [{ name: "Mi Perfil", routerName: "login" }, { name: "Cerrar Sesión", routerName: "logout" }]);
    this.itemsMenu.push(item1);
    // var item2 = new cItemsMenu().create(undefined, [{ name: "Ingresar", routerName: "login" }]);
    // this.itemsMenu.push(item2);
    this.router.navigate([path]);
  }

  public setItems(items: cItemsMenu[], path: string) {
    this.itemsMenu = items;
    this.router.navigate([path]);
  }

  logOut() {
    this.global.logOut();
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
