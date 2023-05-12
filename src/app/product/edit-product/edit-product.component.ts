import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {finalize} from "rxjs";
import {CategoryService} from "../../categories/category.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../product.service";
import {CategoryDto} from "../../categories/dtos/CategoryDto";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../dtos/ProductDto";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('productModal') productModal: any;

  constructor(private categoryService: CategoryService,
              private storage: AngularFireStorage,
              private modalService: NgbModal,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }

  categories: CategoryDto[] = []
  image: string | undefined = ''
  selectImage: any = null
  messageModal: string = 'Tạo thất bại'

  product: ProductDto | undefined
  productId: any
  categoryId: any = null

  formProductEdit: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    is_active: new FormControl()
  })
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data
      this.productId = this.route.snapshot.paramMap.get('id')
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product
        this.formProductEdit = new FormGroup({
          id: new FormControl(this.product.id),
          name: new FormControl(this.product.name),
          price: new FormControl(this.product.price),
          category: new FormControl(this.product.category?.id),
          is_active: new FormControl(this.product.is_active)
        })
        this.image = this.product?.image
      })
    })
  }

  updateProduct() {
    const product = this.formProductEdit.value
    this.productService.updateProduct(product, this.image).subscribe(data => {
      // this.messageModal = 'Sửa thành công'
      // this.modalService.open(this.productModal)
      location.replace('/home/admin')
    })
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

  hideSuccessModal() {
    this.modalService.dismissAll();
  }
}
