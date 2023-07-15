import { Observable, catchError, of } from "rxjs";
import UserType from "../../model/UserType";
import UsersService from "./UsersService";
import { collectionData } from "rxfire/firestore";
import { CollectionReference, DocumentReference, FirestoreError, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import appFirebase from "../../config/firebase-config";

function getErrorMessage(firestoreError: FirestoreError): string {
    let errorMessage = ''
    switch (firestoreError.code) {
        case 'unauthenticated':
        case 'permission-denied': errorMessage = 'Authentication';
            break;
        default: errorMessage = firestoreError.message
    }
    return errorMessage
}

export default class UsersServiceFire implements UsersService {

    collectionRef: CollectionReference = collection(getFirestore(appFirebase), 'users')

    async addUser(user: UserType, uid: string): Promise<UserType> {
        const docRef: DocumentReference = this.getDocRef(uid)
        try {
            await setDoc(docRef, user)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return user
    }

    getUsers(): Observable<string | UserType[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            return of(errorMessage) // позволяет не закрывать "стрим" observable (кастинг Observable<string>)
        })) as Observable<string | UserType[]>
    }

    // async getUser(uid: string): Promise<UserType | string> {
    //     let res: UserType | string = 'User not found'
    //     const docRef: DocumentReference = this.getDocRef(uid)
    //     const doc = await getDoc(docRef)
    //     const user = doc.data()
    //     if (user) {
    //         res = user as UserType
    //     }
    //     return res
    // }

    async updateUser(user: UserType, uid: string): Promise<UserType> {
        const docRef: DocumentReference = this.getDocRef(uid)
        try {
            await setDoc(docRef, user)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return user
    }

    private getDocRef(id: string): DocumentReference {
        return doc(this.collectionRef, id) // возвращает ссылку на информациооный объект
    }

}