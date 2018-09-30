import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AngularFire, FirebaseAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from '../auth/auth.service';

@Component({
  //selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
  private profileForm: FormGroup;
  private message: string = null;
  private isErrorMessage: string = null;
  private photoPath: string = "";
  private photoSrc: any;
  private profileProfileChanged = false;
  private profileEmailChanged = false;
  private profilePasswordChanged = false;

  constructor(public auth$: AuthService,
              private af: AngularFire,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.auth$.userReload;
    this.profileForm = this.fb.group({
      username: new FormControl("", Validators.required),
      photo:  new FormControl(""),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
    if (this.auth$.currentUser) {
      this.profileForm.controls['username'].setValue(this.auth$.currentUser.displayName);
      this.profileForm.controls['email'].setValue(this.auth$.currentUser.email);
    }
    if (!this.auth$.userVerified) {
      this.isErrorMessage = 'red';
      this.message = "The user is not verified yet";
    }
  }

  updateProfile() {
    let err: any = null;
    if (this.profileProfileChanged) {
      this.profileProfileChanged = false;
      err = this.auth$.updateProfile(this.profileForm.value.username, this.profileForm.value.photo);
      this.isErrorMessage = err ? err.color : '#1abc9c';      
      this.message = err ? err.msg : "Updated user profile.";
    }
    if (this.profileEmailChanged) {
      this.profileEmailChanged = false;
      err = this.auth$.updateEmail(this.profileForm.value.email);
      this.isErrorMessage = err ? err.color : '#1abc9c';
      this.message = err ? err.msg : "Updated user email.";
    }
    if (this.profilePasswordChanged) {
      this.profilePasswordChanged = false;
      err = this.auth$.updatePassword(this.profileForm.value.password);
      console.log('vsvsvs');
      console.log(err);
      this.isErrorMessage = err ? err.color : '#1abc9c';      
      this.message = err ? err.msg : "Updated user password.";
    }
  }
  deleteAccount() {
    let uidTree = '/' + this.auth$.id;
    this.auth$.deleteUser()
      .then(() => {
        this.isErrorMessage = '#1abc9c';
        this.message = "We are sorry to hear you are leaving, bye bye.";
        console.info(this.message);
        if (this.af.database.list(uidTree)) {
          this.af.database.list(uidTree).remove();
          firebase.database().goOffline();
        }
        console.info("Related user info deleted.");
        this.router.navigate(["./"], { fragment: 'app' })
      })
      .catch((err) => { 'ERROR @ AuthService # deleteAccount() :' + err.message });
  }
  verifyMe() {
    this.auth$.sendEmailVerification();
    this.isErrorMessage = '#1abc9c';
    this.message = "Sent verification email, check your inbox.";
  }

  handleInputChange(event) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;

    if (!file.type.match(pattern)) {
      this.isErrorMessage = 'red';
      this.message = "Image format is not supported.";
      return;
    }
    this.photoPath = file.name;

    let reader = new FileReader();
    this.readFile(file, reader, (result) => {
      this.photoSrc = result;
    })
  }
  readFile(file, reader, callback){
    reader.onload = () => {     // Set a callback funtion to fire after the file is fully loaded
      callback(reader.result);  // callback with the results
    }
    reader.readAsDataURL(file); // Read the file
  }

}
