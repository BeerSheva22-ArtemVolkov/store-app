import PageType from "../model/PagesType"
import Catalog from "../pages/Catalog"

const pages: PageType = {
    to: '/store',
    name: 'Store',
    categoryName: 'store',
    element: <Catalog inputCategories={[]} />,
    sub: [
        {
            to: '/store/books',
            name: 'Books',
            categoryName: 'books',
            element: <Catalog inputCategories={['books']} />,
            sub: [
                {
                    to: "/store/books/comix",
                    name: "Comix",
                    categoryName: 'comix',
                    element: <Catalog inputCategories={['books', 'comix']} />,
                    sub: []
                },
                {
                    to: "/store/books/manga",
                    name: "Manga",
                    categoryName: 'manga',
                    element: <Catalog inputCategories={['books', 'manga']} />,
                    sub: []
                },
                {
                    to: "/store/books/english",
                    name: "English",
                    categoryName: 'english',
                    element: <Catalog inputCategories={['books', 'english']} />,
                    sub: [
                        {
                            to: "/store/books/english/fantasy",
                            name: "Fantasy",
                            categoryName: 'fantasy',
                            element: <Catalog inputCategories={['books', 'english', 'fantasy']} />,
                            sub: []
                        },
                        {
                            to: "/store/books/english/detective",
                            name: "Detective",
                            categoryName: 'detective',
                            element: <Catalog inputCategories={['books', 'english', 'detective']} />,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            to: '/store/games',
            name: 'Games',
            categoryName: 'games',
            element: <Catalog inputCategories={['games']} />,
            sub: [
                {
                    to: "/store/games/PS5",
                    name: "PS5",
                    categoryName: 'ps5',
                    element: <Catalog inputCategories={['games', 'ps5']} />,
                    sub: []
                },
                {
                    to: "/store/games/PS4",
                    name: "PS4",
                    categoryName: 'ps4',
                    element: <Catalog inputCategories={['games', 'ps4']} />,
                    sub: []
                },
                {
                    to: "/store/games/PC",
                    name: "PC",
                    categoryName: 'pc',
                    element: <Catalog inputCategories={['games', 'pc']} />,
                    sub: []
                }
            ]
        }
    ]
}

export default pages