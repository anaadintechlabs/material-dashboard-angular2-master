
import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from "app/app.service";


@Component({
  selector: 'app-uphoto',
  templateUrl: './uphoto.component.html',
  styleUrls: ['./uphoto.component.scss']
})
export class UphotoComponent implements OnInit {

  productForm: FormGroup;
  error: string;
  uploadError: string;

  @ViewChild('image') private image: ElementRef;
  @Output() close = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private productService : AppService,
    
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: [''],
      price: [''],
      sku: ['']
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const productImage = event.target.files[0];

      const formData = new FormData();
      formData.append('productImage', productImage);
      this.productService.uploadImage(formData).subscribe(
        res => {
          if (res.status === 200 && res.response.status === 'success') {
            this.uploadError = '';

            const li: HTMLLIElement = this.renderer.createElement('li');

            const img: HTMLImageElement = this.renderer.createElement('img');
            img.src = res.response.imagePath;
            this.renderer.addClass(img, 'product-image');

            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Delete';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.deleteProductImage.bind(this, res.response.filename, a));

            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);
          } else {
            this.uploadError = res.response.message;
          }
        },
        err => this.error = err
      );
    }
  }

  deleteProductImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this.productService.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
      },
      err => this.error = err
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('productName', this.productForm.get('productName').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('sku', this.productForm.get('sku').value);
    this.productService.saveProduct(formData).subscribe(
      res => {
        if (res.status === 'success') {
          this.onClose(res);
        }
      },
      err => this.error = err
    );
  }

  onClose(data: any) {
    this.close.emit(data);
  }
}

