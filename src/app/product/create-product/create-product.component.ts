import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../categories/category.service";
import {CategoryDto} from "../../categories/dtos/CategoryDto";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProductService} from "../product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('upLoadCategory', {static: true}) public categoryDom: ElementRef | undefined;
  @ViewChild('productModal') productModal: any;
  @ViewChild('categoryModal') categoryModal: any;
  @ViewChild('successModal') successModal: any;

  constructor(private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private modalService: NgbModal,
              private productService: ProductService,
              ) {
  }

  categories: CategoryDto[]= []
  image ='https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_travelpictdinner_1484336833.png'
  selectImage: any = null
  imageCategory = 'https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg'
  selectImageCategory: any = null
  messageModal: string = 'Tạo thất bại'
  is_active!: boolean
  categoryId!: number

  formCreateProduct: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    is_active: new FormControl(),
    category: new FormControl(),
  })
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data
    })
  }

  createProduct() {
    const product = this.formCreateProduct.value
    const isActiveValue = this.formCreateProduct.value.is_active
    this.is_active = isActiveValue == 'true';
    const categoryValue = this.formCreateProduct.value.category
    this.categoryId = Number(categoryValue)
    console.log(this.categoryId)
    this.productService.createProduct(product, this.image, this.is_active, this.categoryId).subscribe(data => {
      this.messageModal = 'Thêm món thành công, có muốn thêm tiếp?'
      this.modalService.open(this.successModal, {backdrop: true})
    })
  }

  clearValue() {
    this.formCreateProduct = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      is_active: new FormControl(),
      category: new FormControl(),
    })
    this.image ='https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_travelpictdinner_1484336833.png'
  }

  openCreateCategoryModal() {
    this.modalService.open(this.categoryModal)
  }

  createContinue() {
    location.reload()
  }

  back() {
    location.replace('/home/admin')
  }

  upAvatarUser() {
    this.selectImage = this.avatarDom?.nativeElement.files[0];
    this.avatarUser()
  }

  upLoadImageCategory() {
    this.selectImageCategory = this.categoryDom?.nativeElement.files[0]
    this.upImageCategory()
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

  upImageCategory() {
    if (this.selectImageCategory != null) {
      const filePath = this.selectImageCategory.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectImageCategory).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.imageCategory = url;
        })))
      ).subscribe();
    }
  }

  hideModal() {
    this.modalService.dismissAll();
  }

}
