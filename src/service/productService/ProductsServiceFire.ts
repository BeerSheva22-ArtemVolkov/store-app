import { Observable, catchError, of } from "rxjs";
import ProductType from "../../model/ProductType";
import ProductsService from "./ProductsService";
import { CollectionReference, FirestoreError, collection, getFirestore } from "firebase/firestore";
import { collectionData } from 'rxfire/firestore'
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

export default class ProductsServiceFire implements ProductsService {

    collectionRef: CollectionReference = collection(getFirestore(appFirebase), 'products')

    addProduct(product: ProductType): Promise<ProductType> {
        throw new Error("Method not implemented.");
    }

    getProducts(): Observable<string | ProductType[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            return of(errorMessage)
        })) as Observable<string | ProductType[]>
    }

    updateProduct(product: ProductType): Promise<ProductType> {
        throw new Error("Method not implemented.");
    }

}