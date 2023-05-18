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
  profileId: number | undefined
  userDto: UserDto | undefined
  email!: string | undefined
  messageModal!: string


  formProfile: FormGroup = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    balance: new FormControl()
  })

  avatar: any

  ngOnInit() {
    this.profileService.findUserProfile().subscribe(user => {
      this.userDto = user
      this.profile = this.userDto.profile
      this.profileId = this.profile?.id
      this.formProfile = new FormGroup({
        id: new FormControl(this.profile?.id),
        first_name: new FormControl(this.profile?.first_name),
        last_name: new FormControl(this.profile?.last_name),
        age: new FormControl(this.profile?.age),
        gender: new FormControl(this.profile?.gender),
        balance: new FormControl(this.profile?.balance)
      })
      this.avatar = this.profile?.avatar
    })
  }

  saveProfile() {
    const profile = this.formProfile.value
    this.profileService.updateProfile(profile, this.avatar).subscribe(data => {
      this.profile = data
      localStorage.setItem('profileDto', JSON.stringify(data))
      this.messageModal = 'Cập nhật thành công'
      this.modalService.open(this.successModal)
    })
  }

  password: string = '';
  showBalance: boolean = false;

  togglePasswordVisibility() {
    this.showBalance = !this.showBalance;
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

  hiddenModal() {
    this.modalService.dismissAll()
  }

}
