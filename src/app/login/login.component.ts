import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AngularFire, FirebaseAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginMessage: string = "Type your username and password.";
  private lostMessage: string = "Type your e-mail.";
  private registerMessage: string = "Register an account.";

  private verification: boolean = false;
  private photoPath: string = "";
  private photoSrc: any = null;

  private showLostPassword: boolean = false;
  private showLogin: boolean = true;
  private shorRegister: boolean = false;

  private lostForm: FormGroup;
  private registerForm: FormGroup;
  private loginForm: FormGroup;

  //private timer: number;
  private sentVerificationEmail: boolean = false;

  constructor(private af: AngularFire, public auth$: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    /*if (this.auth$.authenticated) {
      this.router.navigate(["user"], { fragment: 'top' });
      return;
    }*/
    this.auth$.userReload;
    if (this.auth$.userVerified) {
      this.router.navigate(["user"], { fragment: 'top' });
      return;
    }
    this.loginForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      rememberme: new FormControl("")
    });
    this.registerForm = this.fb.group({
      username: new FormControl("", Validators.required),
      photo:  new FormControl(""),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
    this.lostForm = this.fb.group({
      email: new FormControl("", Validators.required),
    })
  }

  logIn(): void {
    this.auth$.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
    .then(user => { 
      console.info("Logged in user: " + user.uid);
      if (this.auth$.userVerified) {
        this.router.navigate(["dash"], {fragment: 'top'});
        console.log("Redirecting to dash.");
      }
      else {
        this.auth$.sendEmailVerification();
        this.showLogin = true;
        this.loginMessage ="Check your email for verification";
        console.log(this.loginMessage);
      } 
    })
    .catch((err) => {
      this.loginMessage = err.message;
      console.error('ERROR @ AuthService # logIn() :' + err.message)
    });
  }
  signIn() {
    this.auth$.createUser(this.registerForm.value.email, this.registerForm.value.password)
    .then((success) => {
      console.info("User created correctly.");
      this.auth$.updateProfile(this.registerForm.value.username, this.registerForm.value.photo);
      this.auth$.sendEmailVerification();
      this.verification = true;
      //this.timer = setInterval(this.reloadUser(), 1000 * 20 * 1);
      //this.router.navigate(["dash"]);
    }).catch((err) => {
      this.registerMessage = err.message;
      console.error('ERROR @ AuthService # signIn() :' + err.message);
      this.router.navigate(["login"], { fragment: 'top' });
    });
  }
  lostPassword() {
    var err = this.auth$.resetPassword(this.lostForm.value.email);
    this.lostMessage= err ? err['msg'] : "Sent password recovery email.";
    if (!err){
      this.showLostPassword = false;
      this.verification = true;
    }
  }
  logOut(): void {
    this.verification = false;
    this.auth$.logout();
    //this.router.navigate(["login"], { fragment: "top" });
  }
  verifyEmail() {
    if (!this.auth$.userVerified) {
      this.auth$.sendEmailVerification();
      //this.timer = setInterval(this.reloadUser(), 1000 * 20 * 1);
      this.sentVerificationEmail = true;
      setTimeout(() => {
       this.sentVerificationEmail = false;
      }, 1000 * 10 * 1);
    }
    else this.router.navigate(["user"], { fragment: 'top' });
  }/*
  reloadUser() {
    console.log("Reload currentUser.");
    this.auth$.currentUser.reload();
    if (this.auth$.userVerified) {
      console.log("User has been verified.");
      clearInterval(this.timer);
      return;
    }
  }*/

  handleInputChange(event) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    var pattern = /image-*/;

    if (!file.type.match(pattern)) {
      this.registerMessage = "Image format not supported.";
      console.info (this.registerMessage);
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