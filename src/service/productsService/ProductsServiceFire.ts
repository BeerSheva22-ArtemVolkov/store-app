import { Observable, catchError, of } from "rxjs";
import ProductType from "../../model/ProductType";
import ProductsService from "./ProductsService";
import { CollectionReference, DocumentReference, FirestoreError, collection, deleteDoc, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { collectionData } from 'rxfire/firestore'
import appFirebase from "../../config/firebase-config";
import { getRandomInt } from "../../util/random";

const MIN_ID = 100000
const MAX_ID = 1000000

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

export default class ProductsServiceFire implements ProductsService {

    collectionRef: CollectionReference = collection(getFirestore(appFirebase), 'products')

    async addProduct(product: ProductType): Promise<ProductType> {
        const id: string = await this.getId()
        const docRef: DocumentReference = this.getDocRef(id)
        try {
            await setDoc(docRef, { ...product, id })
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return product
    }

    getProducts(): Observable<string | ProductType[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            return of(errorMessage)
        })) as Observable<string | ProductType[]>
    }

    async updateProduct(product: ProductType): Promise<ProductType> {
        const id: string = product.id
        console.log(id);

        const docRef: DocumentReference = this.getDocRef(id)
        try {
            await setDoc(docRef, { ...product, id })
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return product
    }

    async deleteProduct(productID: any): Promise<void> {
        const docRef: DocumentReference = this.getDocRef(productID);

        if (!productID && !await this.exists(productID)) {
            throw 'not found'
        }
        try {
            await deleteDoc(docRef)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
    }

    private getDocRef(id: string): DocumentReference {
        return doc(this.collectionRef, id) // возвращает ссылку на информациооный объект
    }

    private async exists(id: string): Promise<boolean> {
        const docRef: DocumentReference = this.getDocRef(id)
        const docSnap = await getDoc(docRef) // объект из массива
        return docSnap.exists()
    }

    private async getId(): Promise<string> {
        let id: string = '';
        do {
            id = getRandomInt(MIN_ID, MAX_ID).toString()
        } while (await this.exists(id))
        return id
    }

}