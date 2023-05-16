import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../category.service";
import {CategoryDto} from "../../dtos/CategoryDto";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  constructor(private categoryService: CategoryService, private modalService: NgbModal,
              private storage: AngularFireStorage,) {
  }

  @ViewChild('categoryModal') categoryModal: any;
  @ViewChild('upLoadCategory', {static: true}) public categoryDom: ElementRef | undefined;

  imageCategory: string | undefined = ''
  selectImageCategory: any = null

  categories: CategoryDto[] = []
  formCategory: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl()
  })
  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(categories => {
      this.categories = categories
    })
  }

  async updateCategory(categoryId: number | undefined) {
    const category = await this.findCategoryById(categoryId)
    this.formCategory = new FormGroup({
      id: new FormControl(categoryId),
      name: new FormControl(category?.name)
    })
    this.imageCategory = category?.image
    this.modalService.open(this.categoryModal)
  }

  saveCategory() {
    const category = this.formCategory.value
    this.categoryService.updateCategory(category, this.imageCategory).subscribe(categories => {
      this.categories = categories
      this.modalService.dismissAll()
    })
  }

  upLoadImageCategory() {
    this.selectImageCategory = this.categoryDom?.nativeElement.files[0]
    this.upImageCategory()
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
  findCategoryById(categoryId: number | undefined) {
    return this.categoryService.findCategoryById(categoryId).toPromise()
  }
}
