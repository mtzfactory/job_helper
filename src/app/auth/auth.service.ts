import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseAuth, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
    private authState: FirebaseAuthState = null;
    constructor(private af: AngularFire, public auth$: FirebaseAuth, private router: Router) {
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
            //if (state) console.info("AuthService # auth$.subscribe, uid: " + state.auth.uid || "not set");
            //else router.navigate(["login"], { fragment: "top" });
        });/*
        firebase.auth().onAuthStateChanged(
            (user) => { 
                console.log("onAuthStateChanged");
                console.log(user);
                this.userReload;
                //router.navigate(["user"], { fragment: "top" });
            }, 
            (err) => { console.log("ERROR @ AuthService # constructor: " + err.message); }
        );*/
    }
    get authenticated() {
        return this.authState !== null;
    }
    get id(): string {
        return this.authenticated ? this.authState.uid : 'Not set';
    }
    get currentUser() {
        return this.authState.auth;
    }
    get userVerified() {        
        return this.authenticated ? this.authState.auth.emailVerified : false;
    }
    get userReload() {
        return this.authenticated ? this.authState.auth.reload() : firebase.Promise_Instance=null
    }
    login(keypair) {
        return this.auth$.login(keypair,
        {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        });
    }
    logout() {
        this.auth$.logout();
    }
    createUser(email: string, password: string) {
        return this.auth$.createUser({
            email: email,
            password: password
        })
    }
    deleteUser() {
        return this.authState.auth.delete();
    }
    sendEmailVerification(): void {
        if (this.authenticated)
            this.authState.auth.sendEmailVerification()
                .then(() => { console.info ("Sent email for verification."); })
                .catch((err) => { console.error ( "ERROR @ AuthService # sendEmailVerification: " + err.message ); });
    }/*
    checkActionCode(code: string) {
        return firebase.auth().checkActionCode(code);
    }*/
    resetPassword(email: string) {
        let error: any = null;
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => { console.info ("Sent password reset email."); return null;})
            .catch((err) => { /*error = err;*/ 
                console.error ( "ERROR @ AuthService # resetPassword: " + err.message );
                return { color: 'red', msg: error.message }
            });
        //return (error) ? { color: 'red', msg: error.message } : null;
    }/*
    confirmPasswordReset(code: string, newPassword: string){
        firebase.auth().confirmPasswordReset(code, newPassword)
            .then(() => { console.info ("Password reset verified."); })
            .catch((err) => { console.error ( "ERROR @ AuthService # confirmPasswordReset: " + err.message ); });
    }*/
    updateProfile(name: string, url: string) {
        let error: any = null;
        let profile = { displayName: name, photoURL: url }
        this.authState.auth.updateProfile(profile)
            .then(() => { console.info ("Updated user profile."); })
            .catch((err) => { /*error = err;*/
                console.error ( "ERROR @ AuthService # updateProfile: " + err.message );
                return { color: 'red', msg: error.message };
            });
        /*return (error) ? { color: 'red', msg: error.message } : null;*/
    }
    updateEmail(email: string) {
        let error: any = null;
        this.authState.auth.updateEmail(email)
            .then(() => { 
                this.sendEmailVerification();                            
                console.info ("Check your inbox to verify your email...");
                return { color: '#1abc9c', msg: "Check your inbox to verify your email..." }; 
            })
            .catch((err) => {
                console.error ( "ERROR @ AuthService # updateEmail: " + err.message );
                return { err: 'red', msg: err.message };
            });
        return (error) ? error : null;
    }
    updatePassword(newPassword: string) {
        let error: any = null;
        this.authState.auth.updatePassword(newPassword)
            .then(() => {
                console.info ("Updated user password.");
                let credentials = firebase.auth.EmailAuthProvider.credential(
                    this.currentUser.email, 
                    newPassword);
                this.authState.auth.reauthenticate(credentials);
                /*this.login({
                    email: this.currentUser.email,
                    password: newPassword
                });*/
            })
            .catch((err) => { /*error = err;*/
                console.error ( "ERROR @ AuthService # updatePassword: " + err.message );
                return { err: 'red', msg: err.message };
            });
        /*return (error) ? { color: 'red', msg: error.message } : null;*/
    }
}