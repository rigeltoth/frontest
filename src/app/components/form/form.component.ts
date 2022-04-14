import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  createFormGroup(){
    return new FormGroup({
      name: new FormControl(''),
      cant: new FormControl()
    })
  }

  itemForm: FormGroup
  constructor(public itemService: ItemService) {
    this.itemForm = this.createFormGroup()
   }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.itemService.getItems().subscribe(
      res => this.itemService.items = res
    )
  }

  addItem(){
    this.itemService.createItem(this.itemForm.value).subscribe(
      () => {
        this.getItems()
        this.itemForm.reset()
      })
  }

  getItem(){

  }

  updateItem(item: ItemModel){
   
  }

    deleteItem(_id: string){
      if (confirm('are you sure?'))
      this.itemService.deleteItem(_id).subscribe(
        () => this.getItems()
      )
  }
}
