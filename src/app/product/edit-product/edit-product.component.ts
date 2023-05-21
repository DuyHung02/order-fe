import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {finalize} from "rxjs";
import {CategoryService} from "../../categories/category.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../product.service";
import {CategoryDto} from "../../categories/dtos/CategoryDto";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../dtos/ProductDto";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private modalService: NgbModal,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }
  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('falseModal') falseModal: any;
  @ViewChild('successModal') successModal: any;

  product: ProductDto | undefined
  productId: number | undefined | null
  categories: CategoryDto[] | undefined = []
  image: string | undefined = ''
  selectImage: any = null
  messageModal: string = 'Tạo thất bại'
  is_active!: boolean

  formProduct: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    is_active: new FormControl(),
    category: new FormControl()
  })
  async ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    await this.getCategories()
    this.product = await this.productService.getProductById(this.productId).toPromise()
    this.formProduct = new FormGroup({
      id: new FormControl(this.product?.id),
      name: new FormControl(this.product?.name),
      price: new FormControl(this.product?.price),
      is_active: new FormControl(this.product?.is_active),
      category: new FormControl(this.product?.category?.id)
    })
    this.image = this.product?.image
  }

  async getCategories() {
    this.categories = await this.categoryService.getAllCategory().toPromise()
  }

  async updateProduct() {
    const product = this.formProduct.value
    const isActiveValue = this.formProduct.value.is_active
    this.is_active = isActiveValue == 'true';
    await this.productService.updateProduct(product, this.image, this.is_active).toPromise()
    this.messageModal = 'Cập nhật thành công'
    this.modalService.open(this.successModal)
  }

  upAvatarUser() {
    this.selectImage = this.avatarDom?.nativeElement.files[0];
    this.avatarUser()
  }

  avatarUser() {
    if (this.selectImage != null) {
      const filePath = this.selectImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.image = url;
        })))
      ).subscribe();
    }
  }


  hideModal() {
    this.modalService.dismissAll();
  }
}
