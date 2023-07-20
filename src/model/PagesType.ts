type PageType = {
    to: string
    name: string
    element: React.ReactNode
    sub: PageType[]
    categoryName: string
}

export default PageType