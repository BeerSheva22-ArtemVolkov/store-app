import { Observable, catchError, of } from "rxjs";
import OrderType from "../../model/OrderType";
import ProductType from "../../model/ProductType";
import OrdersService from "./OrdersService";
import { CollectionReference, DocumentReference, FirestoreError, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import appFirebase from "../../config/firebase-config";
import { collectionData } from "rxfire/firestore";
import { getRandomInt } from "../../util/random";
import { getISODateStr } from "../../util/date-functions";

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

function convertEmployee(employee: OrderType, id?: string): OrderType {
    const res: any = {
        ...employee,
        id: id ? id : employee.id,
        dateStart: getISODateStr(new Date())
    }
    return res;
}

export default class OrdersServiceFire implements OrdersService {

    collectionRef: CollectionReference = collection(getFirestore(appFirebase), 'orders') // getFirestore - получить бд

    async addOrder(order: OrderType): Promise<OrderType> {
        const id: string = await this.getId()
        const convertedOrder: OrderType = convertEmployee(order, id)
        const docRef: DocumentReference = this.getDocRef(id)
        try {
            await setDoc(docRef, convertedOrder)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return convertedOrder
    }

    getOrders(): Observable<string | OrderType[]> {
        return collectionData(this.collectionRef).pipe(catchError(error => {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            return of(errorMessage) // позволяет не закрывать "стрим" observable (кастинг Observable<string>)
        })) as Observable<string | OrderType[]>
    }

    getOrder(orderID: any): Promise<string | OrderType> {
        throw new Error("Method not implemented.");
    }

    async updateOrder(product: OrderType): Promise<OrderType> {
        const docRef: DocumentReference = this.getDocRef(product.id)

        // if (!empl.id && !await this.exists(empl.id)) {
        //     throw 'not found'
        // }

        try {
            await setDoc(docRef, product)
        } catch (error: any) {
            const firestoreError: FirestoreError = error;
            const errorMessage = getErrorMessage(firestoreError)
            throw errorMessage
        }
        return product
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