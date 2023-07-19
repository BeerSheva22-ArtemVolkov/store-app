import PagesType from "../model/PagesType"
import Store from "../pages/Store"
import TestPage from "../pages/TestPage"

const pages: PagesType = {
    to: '/Store',
    name: 'Store',
    element: <Store />,
    sub: [
        {
            to: '/Store/Books',
            name: 'Books',
            element: <TestPage name={'Books'} />,
            sub: [
                {
                    to: "/Store/Books/Comix",
                    name: "Comix",
                    element: <TestPage name={'Comix'} />,
                    sub: []
                },
                {
                    to: "/Store/Books/Manga",
                    name: "Manga",
                    element: <TestPage name={'Manga'} />,
                    sub: []
                },
                {
                    to: "/Store/Books/English",
                    name: "English",
                    element: <TestPage name={'English'} />,
                    sub: [
                        {
                            to: "/Store/Books/English/Fantasy",
                            name: "Fantasy",
                            element: <TestPage name={'Fantasy'} />,
                            sub: []
                        },
                        {
                            to: "/Store/Books/English/Detective",
                            name: "Detective",
                            element: <TestPage name={'Detective'} />,
                            sub: []
                        }
                    ]
                }
            ]
        }
    ]
}

export default pages