import { createHashRouter } from "react-router-dom";
import Layout from "@/page/Layout";
import New from "@/page/New";
import Year from "@/page/Year";
import Month from "@/page/Month";
import NotFound from "@/page/NotFound";

const router = createHashRouter(
    [
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    index: true,
                    // path: 'month',
                    element: <Month/>
                },
                {
                    path: 'year',
                    element: <Year/>
                }
            ]
        },

        {
            path: '/new',
            element: <New/>
        },

        {
            path: "*",
            element: <NotFound/>
        }
    ]
)

export default router