export const MIN_PRICE = 0
export const MAX_PRICE = 10000

export const ratingsArray = [
    {
        name: 'f3',
        rating: 3
    },
    {
        name: 'f4',
        rating: 4
    },
    {
        name: 'none',
        rating: 0
    }
]

export const deliveryArray = [
    {
        name: 'today',
        deliveryDays: 0
    },
    {
        name: 'todayOrTomorrow',
        deliveryDays: 1
    },
    {
        name: 'lessWeek',
        deliveryDays: 7
    },
    {
        name: 'none',
        deliveryDays: 100
    }
]

export const sortType = [
    {
        type: 'none',
        name: 'From newwest'
    },
    {
        type: 'priceAscending',
        name: 'Price ascending'
    },
    {
        type: 'priceDescending',
        name: 'Price descending'
    },
    {
        type: 'ratingAscending',
        name: 'Rating ascending'
    },
    {
        type: 'ratingDescending',
        name: 'Rating descending'
    }
]