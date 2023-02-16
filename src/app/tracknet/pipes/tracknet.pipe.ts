import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tracknet' })
export class TracknetPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

@Pipe({ name: "isSelectedEntity" })
export class SelectedEntity implements PipeTransform {
  transform = (selectedList: any[], config: any[]): boolean => {
    return selectedList ? 
    selectedList.find(i => i[config[1] ? config[1] : 'uuid'] == config[0]) ? true : false : false;
  }
}

@Pipe({ name: "searchUser" })
export class searchUser implements PipeTransform {
  transform = (items: any[], searchText: string) => {
     if(!searchText) return items;
     return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items :any[], searchText): any[] {
    let results = [];
     items.forEach(it => {
       if (it.name.toLowerCase().includes(searchText)) {
           results.push(it);
       }
     });
     return results;
  }
}

@Pipe({ name: "searchStudent" })
export class searchStudent implements PipeTransform {
  transform = (items: any[], searchText: string) => {
     if(!searchText) return items;
     return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items :any[], searchText): any[] {
    let results = [];
     items.forEach(it => {
       if (it.name.toLowerCase().includes(searchText)) {
           results.push(it);
       }
     });
     return results;
  }
}

@Pipe({ name: "searchOperator" })
export class searchOperator implements PipeTransform {
  transform = (items: any[], searchText: string) => {
     if(!searchText) return items;
     return this.searchItems(items, searchText.toLowerCase());
  }
  private searchItems(items :any[], searchText): any[] {
    let results = [];
     items.forEach(it => {
       if (it.title.toLowerCase().includes(searchText)) {
           results.push(it);
       }
     });
     return results;
  }
}
