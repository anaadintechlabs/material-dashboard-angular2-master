import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

   BaseUrl='http://localhost:7890/api';

   errorHandler(error){
  return Observable.throw(error) ;
  }

  successResponse(response){
  try {
      if (response) {
        return response.data;
      }
    }
    catch (ex) {
      console.log(ex);
    }
    return response;

  }
  constructor(private httpClient:HttpClient) { }

  uploadImage(formData) 
  {
    console.log("upload image called ");
    //return ajax.post(`${this.apiUrl}api/upload`, formData);
    console.log('upload image proudct'+formData);   
    let url=this.BaseUrl+'/uploadImg';
       return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
 
  }

  deleteImage(formData) 
  {
    console.log('delete proudct'+formData);   
    let url=this.BaseUrl+'/delProd';
       return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
 

    // return this.http.post<any>(`${this.apiUrl}api/deleteImage`, formData)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  saveProduct(formData) 
  {
    console.log('save proudct'+formData);   
    let url=this.BaseUrl+'/addProd';
       return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
 
  }


    saveCategory(formData) {
      console.log('savecategory'+formData);
      let url=this.BaseUrl+'/saveCategory';
         return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
   
    }

    saveSubCategory(data){
     let url=this.BaseUrl+'/saveSubCategory';
    return this.httpClient.post(url,data).pipe(map(this.successResponse), catchError(this.errorHandler));
    }

    saveAttribute(data){
       let url=this.BaseUrl+'/saveAttribute';
    return this.httpClient.post(url,data).pipe(map(this.successResponse), catchError(this.errorHandler));
      }

   getAllCategories(limit,offset)
   {
     let url = this.BaseUrl+'/getAllCategories?limit='+limit+'&offset='+offset;
     return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

   getAllSubCategoryAndAttributeOfCategoryCode(catCode,limit,offset){
    let url = this.BaseUrl+'/getAllSubCategoryAndAttributeOfCategoryCode?catCode='+catCode+'&limit='+limit+'&offset='+offset;
    return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

   getAllAttributeOfCategory(catCode){
     let url=this.BaseUrl+'/getAllAttributeOfCategory?catCode='+catCode;
     return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

}
