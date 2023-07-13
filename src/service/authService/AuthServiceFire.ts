import UserCredentialsDataType from "../../model/UserCredentialsDataType";
import UserDataType from "../../model/UserDataType";
import AuthService from "./AuthService";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore"
import { GoogleAuthProvider, UserCredential, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth"
import appFirebase from "../../config/firebase-config";
import { Google } from "@mui/icons-material";

export default class AuthServiceFire implements AuthService {

    private auth = getAuth(appFirebase)
    private administratorsCollection = collection(getFirestore(appFirebase), 'administrators');

    async login(loginData: UserCredentialsDataType): Promise<UserDataType> {
        let userData: UserDataType = null
        try {
            let userAuth: UserCredential

            switch (loginData.email) {
                case "GOOGLE":
                    userAuth = await signInWithPopup(this.auth, new GoogleAuthProvider)
                    break;
                default:
                    userAuth = await signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
            }
            console.log(userAuth);

            userData = { email: userAuth.user.email as string, role: await this.isAdmin(userAuth.user.uid) ? "admin" : "user" }
            console.log(userData);
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
            console.log(userAuth);

            userData = { email: userAuth.user.email as string, role: "user" }

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