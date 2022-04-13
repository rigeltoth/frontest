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
}
