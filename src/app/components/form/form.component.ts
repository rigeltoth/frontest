import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  createupdate = 'Add'

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      cant: new FormControl('', [Validators.required])
    })
  }

  itemForm: FormGroup
  constructor(public itemService: ItemService) {
    this.itemForm = this.createFormGroup()
   }

  ngOnInit(): void {
    this.getItems()
    console.log(this.itemForm.value)
  }

  clear(){
    this.itemForm = this.createFormGroup()
    this.createupdate = 'Add'
  }

  getItems(){
    this.itemService.getItems().subscribe(
      res => this.itemService.items = res
    )
  }

  addItem(item: ItemModel){
    if (!item._id){
      this.itemService.createItem(this.itemForm.value).subscribe(
        () => {
          this.getItems()
          this.clear()
        })
    }else{
      this.itemService.updateItem(item).subscribe(
        () => {
          this.getItems()
          this.clear()
        }
      )
    }
  }

  editItem(item: ItemModel){
    this.itemForm = this.fillForm(item)
    this.createupdate = 'Edit'
  }

  fillForm(item: ItemModel){
    return new FormGroup({
      _id: new FormControl(item._id),
      name: new FormControl(item.name),
      cant: new FormControl(item.cant)
    })
  }

  deleteItem(_id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.deleteItem(_id).subscribe(
          () => this.getItems()
        )
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
