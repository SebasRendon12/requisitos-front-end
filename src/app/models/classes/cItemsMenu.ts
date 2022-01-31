export class cItemBtn {
  name: string = "";
  routerName: string = "";
}

export class cItemsMenu {
  name: string = "";
  items: cItemBtn[] = [];

  create(name?: string, items?: cItemBtn[]): cItemsMenu {
    if (name !== undefined) {
      this.name = name;
    }
    if (items !== undefined) {
      items.forEach(element => {
        this.items.push(element);
      });
    }
    return this;
  }

  addItem(item: cItemBtn) {
    this.items.push(item);
  }
}