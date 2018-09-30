import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AngularFire, FirebaseAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

//import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.css' ]
})
export class AuthComponent {
	private passwordForm: FormGroup;
	private showVerifyEmail: boolean = false;
	private showResetPassword: boolean = false;
	private showRecoverEmail: boolean = false;
	private auth: firebase.auth.Auth = null;
	private accountEmail: string = null;
	private actionCode: string = null;
	private message:string = null;
	private isErrorMessage: string = null;

	constructor( private router: Router, private fb: FormBuilder, private af: AngularFire) {//, private auth$: AuthService) {
		let qParams = router.parseUrl(router.url).queryParams;
		let mode = qParams['mode'];
		let actionCode = qParams['oobCode'];
		let apiKey = qParams['apiKey'];
		// Configure the Firebase SDK.
		// This is the minimum configuration required for the API to be used.
		//var config = { 'apiKey': apiKey };
		//var app = firebase.initializeApp(config);
  	//var auth = app.auth();
		var auth: firebase.auth.Auth = firebase.auth();

		// Handle the user management action.
		switch (mode) {
			case 'resetPassword':
				// Display reset password handler and UI.
				this.handleResetPassword(auth, actionCode);
				break;
			case 'recoverEmail':
				// Display email recovery handler and UI.
				this.handleRecoverEmail(auth, actionCode);
				break;
			case 'verifyEmail':
				// Display email verification handler and UI.
				this.handleVerifyEmail(auth, actionCode);
				break;
			default:
				// Error: invalid mode.
		}
  }

	ngOnInit() {
		this.passwordForm = this.fb.group({
      password: new FormControl("", Validators.required),
    })
	}

	handleResetPassword(auth: firebase.auth.Auth, actionCode: string) {
		var accountEmail;
		// Verify the password reset code is valid.
		auth.verifyPasswordResetCode(actionCode)
		.then((email)=> {
			 this.accountEmail = email;
			 this.actionCode = actionCode;
			 this.auth = auth;
			// TODO: Show the reset screen with the user's email and ask the user for the new password.
			this.showResetPassword = true;
		})
		.catch((err) => {
			// Invalid or expired action code. Ask user to try to reset the password again.
			this.message = err.message;
			this.isErrorMessage = 'red';
			console.error("ERROR @ AuthComponent # handleResetPassword: " + err.message);
		});
	}
	setNewPassword() {
		let newPassword: string = this.passwordForm.value.password;
		
		if (newPassword && newPassword != '') {
		// Save the new password.
			this.auth.confirmPasswordReset(this.actionCode, newPassword)
			.then((resp) => {
				// Password reset has been confirmed and new password updated.
				this.showResetPassword = false;
				this.message = 'Yei! You have a new password...';
				this.isErrorMessage = '#1abc9c';
				// TODO: Display a link back to the app, or sign-in the user directly if the page belongs to the same domain as the app:
				this.auth.signInWithEmailAndPassword(this.accountEmail, newPassword);
				this.auth = null;
			})
			.catch((err) => {
				// Error occurred during confirmation. The code might have expired or the password is too weak.
				this.message = err.message;
				this.isErrorMessage = 'red';
				console.error("ERROR @ AuthComponent # setNewPassword: " + err.message);
			});
		}
	}
	handleRecoverEmail(auth: firebase.auth.Auth, actionCode: string) {
		var restoredEmail = null;
		// Confirm the action code is valid.
		auth.checkActionCode(actionCode)
		.then((info) => {
			// Get the restored email address.
			restoredEmail = info['data']['email'];
			// Revert to the old email.
			return auth.applyActionCode(actionCode);
		})
		.then(() => {
			// Account email reverted to restoredEmail

			// TODO: Display a confirmation message to the user.

			// You might also want to give the user the option to reset their password
			// in case the account was compromised:
			auth.sendPasswordResetEmail(restoredEmail).then(() => {
				// Password reset confirmation sent. Ask user to check their email.
			}).catch((err) => {
				this.message = err.message;
				this.isErrorMessage = 'red';
				// Error encountered while sending password reset code.
				console.error("ERROR @ AuthComponent # handleRecoverEmail: " + err.message);
			});
		})
		.catch((err) => {
			this.message = err.message;
			this.isErrorMessage = 'red';
			// Invalid code.
			console.error("ERROR @ AuthComponent # handleRecoverEmail: " + err.message);
		});
	}
	handleVerifyEmail(auth: firebase.auth.Auth, actionCode: string) {
		// Try to apply the email verification code.
		auth.applyActionCode(actionCode)
		.then((resp) => {
			// Email address has been verified.
			this.isErrorMessage = '#1abc9c';
			this.message = "Email verified!!! Welcome on board! ;-)";
			auth.currentUser.reload()
			//this.auth$.userReload
				.then(() => { console.info("User reloaded correctly."); })
				.catch((err) => {
					this.message = err.message;
					this.isErrorMessage = 'red';
					console.error("ERROR @ AuthComponent # handleVerifyEmail: " + err.message);
				});
			console.info("User email has been verified. Redirecting...");
			this.router.navigate(["user"], { fragment: 'top' });
		})
		.catch((err) => {
			this.message = err.message;
			this.isErrorMessage = 'red';
			// Code is invalid or expired. Ask the user to verify their email address again.
			console.error("ERROR @ AuthComponent # handleVerifyEmail: " + err.message);
			this.router.navigate(["login"], { fragment: 'top' });
		});
	}
}