import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProfileDto} from "../profileDto/profileDto";
import {UserDto} from "../../user/userDto/userDto";
import {FormControl, FormGroup} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ProfileService} from "../profile-service/profile.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ShareDataService} from "../../share-data/share-data.service";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  @ViewChild('upLoadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('CheckOtpModal') checkOtpModal: any;
  @ViewChild('depositModal') depositModal: any;
  @ViewChild('successModal') successModal: any;
  @ViewChild('falseModal') falseModal: any;

  constructor(private storage: AngularFireStorage, private profileService: ProfileService,
              private modalService: NgbModal, private shareDataService: ShareDataService,
              private authService: AuthService, private userService: UserService) {
  }

  selectImage: any = null
  profile: ProfileDto | undefined
  profileId: number | undefined
  user: UserDto | undefined
  userId: any
  email!: string | undefined
  public buttonText = 'Gửi mã xác nhận';
  public counter = 60;
  public disabled = false;
  messageModal!: string
  deposit!: number

  formProfile: FormGroup = new FormGroup({
    id: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    balance: new FormControl()
  })

  formDeposit: FormGroup = new FormGroup({
    balance: new FormControl()
  })

  formOtp: FormGroup = new FormGroup({
    otp1: new FormControl(),
    otp2: new FormControl(),
    otp3: new FormControl(),
    otp4: new FormControl(),
  })
  avatar: any

  ngOnInit() {
    this.profileService.findUserProfile().subscribe(user => {
      this.user = user
      this.profile = this.user.profile
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

  openDepositModal() {
    this.modalService.open(this.depositModal)
  }

  saveProfile() {
    const profile = this.formProfile.value
    this.profileService.updateProfile(profile, this.avatar).subscribe(data => {
      this.profile = data
      this.messageModal = 'Cập nhật thành công'
      this.modalService.open(this.successModal)
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

  sendOtp() {
    this.authService.sendOtp(this.email).subscribe(data => {
    })
  }

  getDeposit() {
    this.deposit = this.formDeposit.value.balance
    if (this.deposit < 10000) {
      this.messageModal = 'Nạp tối thiểu 10.000đ'
      this.modalService.open(this.falseModal)
    } else {
      this.modalService.open(this.checkOtpModal, {backdrop: false})
    }
  }

  saveDeposit() {
    this.profileService.saveDeposit(this.profileId, this.deposit).subscribe(data => {
      this.messageModal = 'Nạp thành công'
      this.modalService.open(this.successModal, {backdrop: 'static'})
    }, error => {
      this.messageModal = 'Nạp thất bại'
      this.modalService.open(this.falseModal)
    })
  }

  checkOtp() {
    let otpValue = this.formOtp.value
    let otpSting = `${otpValue.otp1}${otpValue.otp2}${otpValue.otp3}${otpValue.otp4}`
    let confirmOtp = parseInt(otpSting)
    this.authService.checkOtpRegister(this.email, confirmOtp).subscribe(data => {
      if (data) {
        this.saveDeposit()
      }
    }, error => {
      if (error.status == 410) {
        this.messageModal = error.error.message
        this.modalService.open(this.falseModal)
      }
      if (error.status == 400) {
        this.messageModal = error.error.message
        this.modalService.open(this.falseModal)
      }
    })
  }

  waitOtp() {
    this.disabled = true;
    const intervalId = setInterval(() => {
      this.counter--;
      this.buttonText = `(${this.counter}s)`;
      if (this.counter === 0) {
        clearInterval(intervalId);
        this.counter = 60;
        this.buttonText = 'Gửi lại mã xác nhận';
        this.disabled = false;
      }
    }, 1000);
  }

  hiddenModal() {
    this.modalService.dismissAll()
  }

}
