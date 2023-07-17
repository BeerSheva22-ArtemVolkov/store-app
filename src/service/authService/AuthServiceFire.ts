import UserCredentialsDataType from "../../model/UserCredentialsDataType";
import UserDataType from "../../model/UserDataType";
import AuthService from "./AuthService";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore"
import { GoogleAuthProvider, UserCredential, getAuth, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signOut, createUserWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth"
import appFirebase from "../../config/firebase-config";

export default class AuthServiceFire implements AuthService {

    private auth = getAuth(appFirebase)
    private administratorsCollection = collection(getFirestore(appFirebase), 'admins');

    async login(loginData: UserCredentialsDataType): Promise<UserDataType | string> {
        let userData: UserDataType | string = null
        try {
            let userAuth: UserCredential | undefined

            switch (loginData.email) {
                case "GOOGLE":
                    userAuth = await signInWithPopup(this.auth, new GoogleAuthProvider)
                    break;
                case "FACEBOOK":
                    userAuth = await signInWithPopup(this.auth, new FacebookAuthProvider)
                    break;
                default:
                    if (!loginData.password) {
                        console.log('link', loginData.email);

                        sendSignInLinkToEmail(this.auth, loginData.email, {
                            url: 'http://localhost:3000/account',
                            handleCodeInApp: true,

                        })
                        
                            .then(() => {
                                // The link was successfully sent. Inform the user.
                                // Save the email locally so you don't need to ask the user for it again
                                // if they open the link on the same device.
                                // ...
                            })
                            .catch((error) => {
                                console.log(error);

                                const errorCode = error.code;
                                const errorMessage = error.message;
                                // ...
                            });
                        userData = 'Link send to your email'
                    } else {
                        userAuth = await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
                    }
            }
            console.log(userAuth);
            if (userAuth) {
                userData = { email: userAuth.user.email as string, role: await this.isAdmin(userAuth.user.uid) ? "admin" : "user", uid: userAuth.user.uid }
                console.log(userData);
            }

        } catch (error: any) {
            console.log(error);

            if (error.code === 'auth/email-already-in-use') {
                console.log("User with this email already registered");
            } else if (error.code === 'auth/invalid-email') {
                console.log("Invalid email address");
            } else if (error.code === 'auth/user-not-found') {
                console.log("User not found");
            }

        }
        return userData
    }

    logout(): Promise<void> {
        return signOut(this.auth)
    }

    async register(loginData: UserCredentialsDataType): Promise<UserDataType | string> {
        let res: UserDataType | string = ''
        let userData: UserDataType = null
        try {
            let userAuth: UserCredential

            userAuth = await createUserWithEmailAndPassword(this.auth, loginData.email, loginData.password)
            // userAuth.user.sendEmailVerification();
            console.log(userAuth);

            userData = { email: userAuth.user.email as string, role: "user", uid: userAuth.user.uid }

            res = userData
            console.log(userData);

        } catch (error: any) {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                res = "User with this email already registered";
            } else if (error.code === 'auth/invalid-email') {
                res = "Invalid email address"
            }
        }
        return res
    }

    // getAvailableProviders(): NetworkType[] {
    //     throw new Error("Method not implemented.");
    // }

    private async isAdmin(uid: any): Promise<boolean> {
        const docRef = doc(this.administratorsCollection, uid)
        return (await getDoc(docRef)).exists()
    }
}