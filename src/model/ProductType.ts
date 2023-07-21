import { DocumentReference } from "firebase/firestore"

type ProductType = {
    id?: any
    deliveryDays: number
    name: string
    price: number
    quantity: number
    description: string
    image: {
        url: string
        storageRef: string
    }
    rating: {
        rate: number
        count: number
    }
    categories: string[]
}

export default ProductType