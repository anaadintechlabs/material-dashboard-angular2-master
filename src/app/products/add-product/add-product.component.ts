import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  attributeList: any=[];
  subCategoryList: any=[];
  categoryList: any = [];


  limit:number=15;
  offset:number=0;

     product = new FormGroup({
    category: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    subCategory: new FormControl('', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)])
  });

  
    categories:any[]=[
    {id:1,name:'laptop',desc:'description',img:'l1.jpg'},
    {id:2,name:'mobile',desc:'description',img:'m1.jpg'},
    {id:3,name:'shoes',desc:'description',img:'s1.jpg'},
    {id:4,name:'clothes',desc:'description',img:'c1.jpg'}

  ];

    products:any[]=[
    {pid:1,catid:1,name:'dell',img:'l1.jpg',desc:'description',price:15000,qty:100},
    {pid:2,catid:1,name:'sony vaio',img:'l2.jpg',desc:'description',price:25000,qty:150},
    {pid:3,catid:2,name:'apple',img:'m1.jpg',desc:'description',price:35000,qty:200},
    {pid:4,catid:2,name:'samsung',img:'m2.jpg',desc:'description',price:45000,qty:250},
    {pid:5,catid:3,name:'nike',img:'s1.jpg',desc:'description',price:45000,qty:300},
    {pid:6,catid:3,name:'woodland',img:'s2.jpg',desc:'description',price:65000,qty:400},
    {pid:7,catid:4,name:'wrangler',img:'c1.jpg',desc:'description',price:75000,qty:450},
    {pid:8,catid:4,name:'spykar',img:'c2.jpg',desc:'description',price:85000,qty:500}
  ];
   selected = 'option2';
  constructor(private appService : AppService) { }

  ngOnInit() {
    this.getAllCategories();

  }

    getAllCategories(){
    this.appService.getAllCategories(this.limit,this.offset).subscribe(data=>{
      this.categoryList=data.categoryList;
      console.log('all categoryes'+this.categoryList);
    },error=>{
      console.log('error');
    });
  }

  productFormOnSubmit(action)
  {
    alert('submit btn cilcked ');
  }
   getAllSubCategoryAndAttributeOfCategoryCode(category){
    this.appService.getAllSubCategoryAndAttributeOfCategoryCode(category.catCode,this.limit,this.offset).subscribe(data=>{
     
       this.subCategoryList=data.subCategoryList;
       this.attributeList=data.attributeList;
       console.log('subCategoryList',this.subCategoryList);
        console.log('attributeList',this.attributeList);     
    },errpr=>{
      console.log('error');
    });
  }

  checkForModelorLeafCategory(subCategory)
  {
    console.log('selected Subcategory is'+subCategory);
    
  }


}
