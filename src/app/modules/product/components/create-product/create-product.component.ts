import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductInterface} from '../../../../interfaces/product.interface';
import {SessionService} from '../../../../services/session.service';
import {ProductService} from '../../../../services/product.service';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {faEdit, faPlusSquare, faSpinner, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploadService} from '../../../../services/file-upload.service';
import {PRODUCT_APIS} from '../../../../constants/api.constants';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  faTimes = faTimes;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faSpinner = faSpinner;

  productForm: FormGroup;
  initialLoading: boolean;
  isCreating: boolean;

  mode: 'create' | 'edit' = 'create';
  product: ProductInterface;

  imageUrl: string | ArrayBuffer = 'https://bulma.io/images/placeholders/480x480.png';
  isUploadingFile = false;
  private uploadFile: File;


  constructor(private fb: FormBuilder,
              private sessionService: SessionService,
              private location: Location,
              private route: ActivatedRoute,
              private fileUploadService: FileUploadService,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.fetchProduct(paramMap.get('productId'));
      } else {
        this.buildForm();
      }
    });
  }

  cancel() {
    if (confirm(`Cancel ${this.mode === 'create' ? 'creating' : 'editing'} product`)) {
      this.location.back();
    }
  }

  createProduct() {
    this.isCreating = true;
    const postObj = this.productForm.getRawValue();

    let apiCall: Observable<ProductInterface>;
    const successMessage = `Product ${this.mode === 'create' ? 'created' : 'edited'}`;

    if (this.mode === 'create') {
      apiCall = this.productService.createProducts(postObj);
    } else {
      if (this.uploadFile) {
        apiCall = this.fileUploadService.uploadFile<ProductInterface>(
          'patch',
          PRODUCT_APIS.product + this.product.id + '/',
          this.uploadFile,
          postObj,
          'image'
        );
      } else {
        apiCall = this.productService.updateProduct(this.product.id, postObj);
      }
    }
    apiCall.subscribe(response => {
      alert(successMessage);
      this.isCreating = false;
      this.location.back();
      this.router.navigate(['/product', response.id, 'view']);
    }, er => {
      let errStr = 'Something went wrong while creating the product/service';
      if (er.status === 400) {
        const keys = Object.keys(er.error);
        errStr = er.error[keys[0]][0];
      }
      alert(errStr);
      this.isCreating = false;
    });
  }

  onFileInputChange(file: File) {
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Maximum allowed file: 2MB');
        return;
      }

      this.uploadFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  private buildForm() {
    this.productForm = this.fb.group({
      created_by: [this.sessionService.user.id],

      name: this.fb.control(this.product?.name || '', [Validators.required, Validators.maxLength(250)]),
      category: this.fb.control(this.product?.category || '', [Validators.maxLength(500)]),

      price: this.fb.control(this.product?.price || null, [Validators.required, Validators.max(90000000), Validators.min(0)]),
      landing_price: this.fb.control(this.product?.landing_price || null, [
        Validators.required, Validators.max(90000000), Validators.min(0)
      ]),
      distributor_margin: this.fb.control(this.product?.distributor_margin || null, [
        Validators.required, Validators.max(100), Validators.min(0)
      ]),
      retailer_margin: this.fb.control(this.product?.retailer_margin || null, [
        Validators.required, Validators.max(100), Validators.min(0)
      ]),

      stock: this.fb.control({value: this.product?.stock || null, disabled: this.mode === 'edit'}, [
        Validators.required, Validators.max(90000000), Validators.min(0)
      ]),
      barcode_entry: this.fb.control(this.product?.barcode_entry || null, [
        Validators.required, Validators.maxLength(200)
      ]),
      is_active: [true]
    });
  }

  private fetchProduct(productId: string) {
    this.initialLoading = true;
    this.productService.getProductById(productId).subscribe(response => {
      this.initialLoading = false;
      this.product = response;
      this.buildForm();
    });
  }
}
