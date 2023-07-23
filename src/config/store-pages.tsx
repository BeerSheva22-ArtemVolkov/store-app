import PageType from "../model/PagesType"
import Catalog from "../components/pages/Catalog"

const pages: PageType = {
    to: '/store',
    name: 'Store',
    categoryName: 'store',
    element: <Catalog inputCategories={[]} />,
    sub: [
        {
            to: '/store/manga',
            name: 'Manga',
            categoryName: 'manga',
            element: <Catalog inputCategories={['manga']} />,
            sub: [
                {
                    to: "/store/manga/russian",
                    name: "Russian",
                    categoryName: 'russian',
                    element: <Catalog inputCategories={['manga', 'russian']} />,
                    sub: [
                        {
                            to: "/store/manga/russian/onepiece",
                            name: "Onepiece",
                            categoryName: 'onepiece',
                            element: <Catalog inputCategories={['manga', 'russian', 'onepiece']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/russian/naruto",
                            name: "Naruto",
                            categoryName: 'naruto',
                            element: <Catalog inputCategories={['manga', 'russian', 'naruto']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/russian/aot",
                            name: "Attack on Titan",
                            categoryName: 'aot',
                            element: <Catalog inputCategories={['manga', 'russian', 'aot']} />,
                            sub: []
                        }
                    ]
                },
                {
                    to: "/store/manga/english",
                    name: "English",
                    categoryName: 'english',
                    element: <Catalog inputCategories={['manga', 'english']} />,
                    sub: [
                        {
                            to: "/store/manga/english/onepiece",
                            name: "Onepiece",
                            categoryName: 'onepiece',
                            element: <Catalog inputCategories={['manga', 'english', 'onepiece']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/english/naruto",
                            name: "Naruto",
                            categoryName: 'naruto',
                            element: <Catalog inputCategories={['books', 'english', 'naruto']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/english/aot",
                            name: "Attack on Titan",
                            categoryName: 'aot',
                            element: <Catalog inputCategories={['books', 'english', 'aot']} />,
                            sub: []
                        }
                    ]
                },
                {
                    to: "/store/manga/japan",
                    name: "Japan",
                    categoryName: 'japan',
                    element: <Catalog inputCategories={['manga', 'japan']} />,
                    sub: [
                        {
                            to: "/store/manga/japan/onepiece",
                            name: "Onepiece",
                            categoryName: 'onepiece',
                            element: <Catalog inputCategories={['manga', 'japan', 'onepiece']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/japan/naruto",
                            name: "Naruto",
                            categoryName: 'naruto',
                            element: <Catalog inputCategories={['books', 'japan', 'naruto']} />,
                            sub: []
                        },
                        {
                            to: "/store/manga/japan/aot",
                            name: "Attack on Titan",
                            categoryName: 'aot',
                            element: <Catalog inputCategories={['books', 'japan', 'aot']} />,
                            sub: []
                        }
                    ]
                }
            ]
        },
        {
            to: '/store/figures',
            name: 'Figures',
            categoryName: 'figures',
            element: <Catalog inputCategories={['figures']} />,
            sub: [
                {
                    to: "/store/figures/onepiece",
                    name: "One piece",
                    categoryName: 'onepiece',
                    element: <Catalog inputCategories={['figures', 'onepiece']} />,
                    sub: []
                },
                {
                    to: "/store/figures/naruto",
                    name: "Naruto",
                    categoryName: 'naruto',
                    element: <Catalog inputCategories={['figures', 'naruto']} />,
                    sub: []
                },
                {
                    to: "/store/figures/aot",
                    name: "Attack on Titan",
                    categoryName: 'aot',
                    element: <Catalog inputCategories={['figures', 'aot']} />,
                    sub: []
                }
            ]
        },
        {
            to: '/store/cosplay',
            name: 'Cosplay',
            categoryName: 'cosplay',
            element: <Catalog inputCategories={['cosplay']} />,
            sub: []
        }
    ]
}

export default pages