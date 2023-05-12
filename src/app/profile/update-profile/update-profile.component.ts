import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProfileService} from "../profile-service/profile.service";
import {UserDto} from "../../user/userDto/userDto";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{
  constructor(private storage: AngularFireStorage, private profileService: ProfileService,
              private modalService: NgbModal) {
  }

  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('successModal') successModal: any;
  @ViewChild('falseModal') falseModal: any;
  avatar = 'https://firebasestorage.googleapis.com/v0/b/orderhere-b2bca.appspot.com/o/logoNK.png?alt=media&token=22ac1d50-84ff-4381-8bb2-1351a49df3da'
  selectImage: any = null
  user: UserDto | undefined
  userId: any
  formProfile: FormGroup = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    age: new FormControl(),
    gender: new FormControl()
  })

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("userDto"));
    this.userId = this.user?.id
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
          this.avatar = url;
        })))
      ).subscribe();
    }
  }

  createProfile() {
    let profile = this.formProfile.value
    this.profileService.createProfile(this.userId).subscribe(data => {
      console.log(data)
      localStorage.setItem("userDto", JSON.stringify(data))
      this.modalService.open(this.successModal);
    }, error => {
      this.modalService.open(this.falseModal);
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }

  nextToHome() {
    location.replace('/')
  }

  nextToProfile() {
    location.replace('/profile')
  }


}
