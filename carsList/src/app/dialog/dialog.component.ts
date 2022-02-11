import { ApiService } from '../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  clist = ["ABS", "Electric window hoist", "Hatch", "Bluetooth", "Alarm", "Parking control", "Navigation", "On-board computer", "Multi wheel"]
  productForm !: FormGroup;
  actionBtn : string ="Save"
  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name : ['', Validators.required],
      model : ['', Validators.required],
      comment : ['', Validators.required],
      // Imagebox : ['', Validators.required],
      box : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['Name'].setValue(this.editData.Name);
      this.productForm.controls['model'].setValue(this.editData.model);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['box'].setValue(this.editData.box);
    }
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("car added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("upps!!! ERROR")
          }
        })
      }
    }else{
        this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("update Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("oops!!! ERROR")
      }
    })
  }

}


