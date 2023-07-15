type UserType = {
    email: string
    firstName: string
    lastName: string
    nickname: string
    address: {
        city: string
        street: string
        streetNumber: number
        flatNumber: number
    }
}

export default UserType