import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url_api = 'http://localhost:4000/api/items/'

  items: ItemModel[] = []

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get<ItemModel[]>(this.url_api)
  }

  createItem(item: ItemModel){
    return this.http.post(this.url_api, item)
  }

  getItem(){

  }

  updateItem(item: ItemModel){
    return this.http.put(`${this.url_api}/${item._id}`, item)
  }

  deleteItem(_id: string){
    return this.http.delete(`${this.url_api}/${_id}`)
  }
}
