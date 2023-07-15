type ProductType = {
    id?: any
    name: string
    price: number
    quantity: number
    description: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export default ProductType