import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfileDto} from "../profileDto/profileDto";
import {UserDto} from "../../user/userDto/userDto";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProfileService} from "../profile-service/profile.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('successModal') successModal: any;
  @ViewChild('falseModal') falseModal: any;

  constructor(private storage: AngularFireStorage, private profileService: ProfileService,
              private modalService: NgbModal) {
  }

  selectImage: any = null
  profile: ProfileDto | undefined
  user: UserDto | undefined
  userId: any
  formProfile!: FormGroup
  avatar: any

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("userDto"))
    this.userId = this.user?.id
    this.profileService.findUserById(this.userId).subscribe(data => {
      this.user = data
      this.formProfile = new FormGroup({
        first_name: new FormControl(this.user?.profile?.first_name),
        last_name: new FormControl(this.user?.profile?.last_name),
        age: new FormControl(this.user?.profile?.age),
        gender: new FormControl(this.user?.profile?.gender),
      })
      this.avatar = this.user.profile?.avatar
    })
  }

  saveProfile() {
    const profile = this.formProfile.value
    this.profileService.saveProfile(this.userId, profile, this.avatar).subscribe(data => {
      if (data) {
        this.modalService.open(this.successModal);
      } else {
        this.modalService.open(this.successModal);
      }
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
          this.avatar = url;
        })))
      ).subscribe();
    }
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }

}
