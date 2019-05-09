import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from "app/app.service";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  key: string;
  keyList: any = [];
  invalidKey: boolean;
  selected: string = 'input';
  invalidModel: boolean;
   //For pagination
  public limit=15;
  public offset=0;
  public  modelAvailable:boolean=false;
  public modelValue:any;
  categoryList:any=[];
  subCategoryList: any=[];
  attributeList:any=[];
  modelList:any=[];
  selectedCatCode:any;


   category = new FormGroup({
    catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    catCode: new FormControl('', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
     allowBidding:new FormControl(),
   
  });

 
    subCategory = new FormGroup({
      parentCategory:new FormGroup({
        catCode:new FormControl('')
      }),
    catName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    catCode: new FormControl('', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    catDesc: new FormControl('',[Validators.required, Validators.maxLength(50),,Validators.minLength(3)]),
    modelAvailable: new FormControl(''),
    models:new FormControl('')
  });
  
  catAttribute=new FormGroup({
      parentCategory:new FormGroup({
        catCode:new FormControl('')
      }),
    attributeName: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.minLength(3)]),
    attributeType: new FormControl('input', [Validators.required, Validators.maxLength(25),,Validators.minLength(3)]),
    attributeValue:new FormControl('')
   
  })

  submitted:boolean=false;
  action:any='list';
  constructor(private appService : AppService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  //MEthod for getting all category on main page
  getAllCategories(){
    this.appService.getAllCategories(this.limit,this.offset).subscribe(data=>{
      this.categoryList=data.categoryList;
      this.action='list';
    },error=>{
      console.log('error');
    });
  }

  //Method for getting sub categories by clicking on particular category
  getAllSubCategoryAndAttributeOfCategoryCode(category){
    this.appService.getAllSubCategoryAndAttributeOfCategoryCode(category.catCode,this.limit,this.offset).subscribe(data=>{
      this.action='view';
       this.subCategoryList=data.subCategoryList;
       this.attributeList=data.attributeList;
       console.log('subCategoryList',this.subCategoryList);
        console.log('attributeList',this.attributeList);
      this.category.patchValue({
        catCode:category.catCode,
        catName:category.catName,
        catDesc:category.catDesc,
        status:category.status,
        allowBidding:category.allowBidding
      });
      this.category.disable();
      
     
    },errpr=>{
      console.log('error');
    });
  }

  //Method for adding on add category button
  addCategory(){
    this.action='add';
   
    this.submitted=false;   
  }

  
  //Show listinng on back button
  //and reseting all forms
  backButton(){
    this.action='list';
    this.submitted=false;
     this.category.reset();
    this.category.enable();
    this.subCategory.reset();
    this.catAttribute.reset();
  }

  //method for adding sub category
  addSubcategory(catCode){
    this.action='addSub'
    this.selectedCatCode=catCode;
    this.modelAvailable=false;
    //patching parent category attribute and making it readonly
    this.subCategory.controls.parentCategory.patchValue({
      catCode:catCode
    });
    console.log(this.subCategory.controls.parentCategory);
  }

  addAttribute(catCode){
    this.action='addAttr';
    this.selected='input';
    this.selectedCatCode=catCode;
    this.catAttribute.controls.parentCategory.patchValue({
      catCode:catCode
    });
  }
  //Category form submitted
  categoryFormOnSubmit(){
    this.submitted=true;
    console.log('this.cate'+this.category.value);
    if(this.category.invalid)
      {
        console.log('form invalid');
      }
      else{
        this.appService.saveCategory(this.category.value).subscribe(data=>{
         this.getAllCategories();
        },error=>{
          console.log('error',error);
        });
        
        
      }
  }

  subCategoryFormOnSubmit(){
    this.submitted=true;
    console.log(this.subCategory);
    if(this.subCategory.invalid){
      console.log('form invalid');
    }
    else{
      console.log(this.subCategory.controls.modelAvailable.value);
      if(this.subCategory.controls.modelAvailable.value==true){
        this.subCategory.controls.models.setValue(this.modelValue);
         }
      console.log(this.subCategory.controls.modelAvailable.value);
      this.appService.saveSubCategory(this.subCategory.value).subscribe(data=>{
        this.getAllCategories();
        alert('sub category added');
      },error=>{
        console.log('errir');
      });
    }
  }

  attributeFormOnSubmit(){
    this.submitted=false;
console.log('attrobute form is'+this.catAttribute);
if(this.catAttribute.invalid){
  console.log('error');
}
else{
   if(this.catAttribute.controls.attributeType.value!=='input'){
        this.catAttribute.controls.attributeValue.setValue(this.key);
         }
 this.appService.saveAttribute(this.catAttribute.value).subscribe(data=>{
        console.log('sub category added');
        alert('attribute sub category added');
      },error=>{
        console.log('errir');
      })
}

  }




  //Change events
      modelChange(event){
        console.log('event is'+event);
        this.modelAvailable=event;
      }

      addNewModel(){
        //check for empry value
        if(this.subCategory.controls.models.value!==''){
          //check for duplicate value
         if(this.modelList.indexOf(this.subCategory.controls.models.value)==-1){
           //if first time, no comma
        if(this.modelValue==undefined){
        this.modelValue=this.subCategory.controls.models.value;
        }
      //further comma seperated
      else{
        this.modelValue=this.modelValue+','+this.subCategory.controls.models.value;
      }
      this.modelList.push(this.subCategory.controls.models.value);
      //resetting input field
      this.subCategory.controls.models.setValue('');
       this.invalidModel=false;
         }
      else
        {
          alert('duplicate');
         //  this.subCategory.controls.models.setValue('');
          this.invalidModel=true;
        }
        }
    else{
      this.invalidModel=true;
    }
      }



      addNewKey(){
        //check for empry value
        if(this.catAttribute.controls.attributeValue.value!==''){
          //check for duplicate value
         if(this.keyList.indexOf(this.catAttribute.controls.attributeValue.value)==-1){
           //if first time, no comma
        if(this.key==undefined){
        this.key=this.catAttribute.controls.attributeValue.value;
        }
      //further comma seperated
      else{
        this.key=this.key+','+this.catAttribute.controls.attributeValue.value;
      }
      this.keyList.push(this.catAttribute.controls.attributeValue.value);
      //resetting input field
      this.catAttribute.controls.attributeValue.setValue('');
       this.invalidKey=false;
         }
      else
        {
          alert('duplicate');
         //  this.subCategory.controls.models.setValue('');
          this.invalidKey=true;
        }
        }
    else{
      this.invalidKey=true;
    }
      }



      getSelectedAttribue(event){
        console.log(event);
      this.selected=event;
      }


}
