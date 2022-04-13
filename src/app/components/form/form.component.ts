import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.itemService.getItems().subscribe(
      res => this.itemService.items = res,
      err => console.error(err)
    )
  }
}
