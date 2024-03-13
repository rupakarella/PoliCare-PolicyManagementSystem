import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Users } from 'src/app/models/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';
import { NavigationService } from 'src/app/service/navigation.service';
<<<<<<< HEAD
=======
import { ProfilepicService } from 'src/app/service/profilepic.service';
>>>>>>> rupa

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: Users;
  isEdit: boolean = false;
  usersForm!: FormGroup;
  submitted = false;
  showPassword = true;
  response: any;
<<<<<<< HEAD
  public loggedIn=true;
  public UserloggedIn=false;
  public AdminloggedIn=false;


  constructor(private userService: UserService, private router: Router,private formBuilder: FormBuilder,private jwtService:JwtService, private navigationService: NavigationService) { 
  this.usersForm = this.formBuilder.group({
    userId: [],
    emailAddress: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern('^[6789]\\d{9}$')]],
    password: ['', Validators.required],
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
    dateOfBirth: ['', Validators.required],
    panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}\\d{4}[A-Z]{1}$')]],
    // employerType: ['', [Validators.required, Validators.maxLength(25)]],
    employerName: [],
    salary: ['', Validators.min(0)],
    userType: ['', [Validators.required, Validators.pattern('^(Admin|User)$')]],
    address: this.formBuilder.group({
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      cityPincode: ['', Validators.required],
      state: ['', Validators.required]
    }),
    userPolicies: this.formBuilder.array([])
  });
}
=======
  public loggedIn = true;
  public UserloggedIn = false;
  public AdminloggedIn = false;
  pictureUrlLink = "assets/profile-user.png";
  pictureFile: any;

  constructor(private userService: UserService, private profilePicService: ProfilepicService, private router: Router, private formBuilder: FormBuilder, private jwtService: JwtService, private navigationService: NavigationService) {
    this.usersForm = this.formBuilder.group({
      userId: [],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[6789]\\d{9}$')]],
      password: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      dateOfBirth: ['', Validators.required],
      panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}\\d{4}[A-Z]{1}$')]],
      // employerType: ['', [Validators.required, Validators.maxLength(25)]],
      employerName: [],
      salary: ['', Validators.min(0)],
      userType: ['', [Validators.required, Validators.pattern('^(Admin|User)$')]],
      address: this.formBuilder.group({
        addressLine: ['', Validators.required],
        city: ['', Validators.required],
        cityPincode: ['', Validators.required],
        state: ['', Validators.required]
      }),
      userPolicies: this.formBuilder.array([])
    });
  }
>>>>>>> rupa
  ngOnInit(): void {
    this.navigationService.disableBackButton();
    this.getUserById();
    {
      this.loggedIn = this.jwtService.isUserLoggedIn() || this.jwtService.isAdminLoggedIn();
<<<<<<< HEAD
      this.UserloggedIn =this.jwtService.isUserLoggedIn();
=======
      this.UserloggedIn = this.jwtService.isUserLoggedIn();
>>>>>>> rupa
      this.AdminloggedIn = this.jwtService.isAdminLoggedIn();
      this.router.navigate(['/profile']);
    }

  }
<<<<<<< HEAD
  logoutUser()
  {
    this.jwtService.logout();
    this.loggedIn=false;
    this.UserloggedIn=false;
    this.AdminloggedIn=false;
=======
  logoutUser() {
    this.jwtService.logout();
    this.loggedIn = false;
    this.UserloggedIn = false;
    this.AdminloggedIn = false;
>>>>>>> rupa
    alert("Logged Out");
    this.router.navigate(['/']);
  }

  isAdminLoggedIn() {
    return localStorage.getItem('token') !== null && localStorage.getItem('userType') === 'Admin';
  }

  isUserLoggedIn() {
    return localStorage.getItem('token') !== null && localStorage.getItem('userType') === 'User';
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem('userId')).subscribe(
      (data: Users) => {
        this.user = data;
<<<<<<< HEAD
=======
        this.getProfilePic();
>>>>>>> rupa
      },
      (error) => {
        console.log('Error fetching user details:', error);
      }
    );
  }
<<<<<<< HEAD

  onEditClicked() {
    this.isEdit = true;
=======
  getProfilePic() {
    this.profilePicService.getProfilePic().subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          // Convert blob to base64 data URL
          this.pictureUrlLink = reader.result as string;
        }, false);

        if (blob) {
          reader.readAsDataURL(blob);
        }
      },
      (error) => {
        console.error('Error fetching profile picture:', error);
      }
    );
  }
  onEditClicked() {
    this.isEdit = true;
    this.usersForm.patchValue({
      emailAddress: this.user.emailAddress,
      contactNumber: this.user.contactNumber,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      dateOfBirth: this.user.dateOfBirth,
      panNumber: this.user.panNumber,
      employerName: this.user.employerName,
      salary: this.user.salary,
      userType: this.user.userType,
      address: {
        addressLine: this.user.address.addressLine,
        city: this.user.address.city,
        cityPincode: this.user.address.cityPincode,
        state: this.user.address.state
      }
    });
>>>>>>> rupa
  }
  get f() {
    return this.usersForm.controls;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

<<<<<<< HEAD
  onUpdate()
   {
     this.user.userId=+localStorage.getItem('userId')!;
     this.user.emailAddress=this.usersForm.value.emailAddress;
     this.user.contactNumber=this.usersForm.value.contactNumber;
     this.user.password=this.usersForm.value.password;
     this.user.firstName=this.usersForm.value.firstName;
     this.user.lastName=this.usersForm.value.lastName;
     this.user.dateOfBirth=this.usersForm.value.dateOfBirth;
     this.user.panNumber=this.usersForm.value.panNumber;
     this.user.employerName=this.usersForm.value.employerName;
     this.user.salary=this.usersForm.value.salary;
     this.user.userType=this.usersForm.value.userType;
     this.user.address.addressLine=this.usersForm.value.address.addressLine;
     this.user.address.city=this.usersForm.value.address.city;
     this.user.address.cityPincode=this.usersForm.value.address.cityPincode;
     this.user.address.state=this.usersForm.value.address.state;

      
      let response = this.userService.updateUser(this.user);

      response.subscribe
      ( 
        responseData => 
        {
          this.response = responseData; 
          console.log(responseData);
          alert("User Details Updated!");
          this.router.navigate(['/login']);


        },
        error =>
        {
          console.log(error);
          alert("Error while updating details");
=======
  onUpdate() {
    this.user.userId = +localStorage.getItem('userId')!;
    this.user.emailAddress = this.usersForm.value.emailAddress;
    this.user.contactNumber = this.usersForm.value.contactNumber;
    this.user.password = this.usersForm.value.password;
    this.user.firstName = this.usersForm.value.firstName;
    this.user.lastName = this.usersForm.value.lastName;
    this.user.dateOfBirth = this.usersForm.value.dateOfBirth;
    this.user.panNumber = this.usersForm.value.panNumber;
    this.user.employerName = this.usersForm.value.employerName;
    this.user.salary = this.usersForm.value.salary;
    this.user.userType = this.usersForm.value.userType;
    this.user.address.addressLine = this.usersForm.value.address.addressLine;
    this.user.address.city = this.usersForm.value.address.city;
    this.user.address.cityPincode = this.usersForm.value.address.cityPincode;
    this.user.address.state = this.usersForm.value.address.state;


    let response = this.userService.updateUser(this.user);

    response.subscribe
      (
        responseData => {
          this.response = responseData;
          console.log(responseData);
          alert("User Details Updated!");
          this.router.navigate(['/user-dashboard']);


        },
        error => {
          console.log(error);
>>>>>>> rupa
          window.location.reload();

        });
  }
<<<<<<< HEAD
=======
  selectFile(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.pictureFile = event.target.files[0];
      console.log(this.pictureFile)
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) { // Check if ctx is not null
            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;

            ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);

            this.pictureUrlLink = canvas.toDataURL();
            if (this.pictureFile != null) {
              this.profilePicService.uploadProfilePicture(this.pictureFile).then((res) => {
                if (res !== '') {
                  alert(`Successfully uploaded`);
                  this.router.navigate(['/profile']);
                }
              },
                (err) => {
                  if (err.status === 200) {
                    alert(`Successfully uploaded`);
                    this.router.navigate(['/profile'])
                  } else {
                    alert(`Error in uploading file`)
                  }
                })
            }
          }

          else {
            console.error('Unable to get 2D context for canvas.');
          }
        };

        img.onerror = () => {
          console.error('Error loading image.');
        };
      };

      reader.onerror = () => {
        console.error('Error reading file.');
      };

      reader.readAsDataURL(file);
    }
  }

>>>>>>> rupa
}