import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"

const Layout = () => {

    return (
        <div>
            我是Layout页
            <Link to="/layout">Board</Link>
            <Link to="/layout/about">About</Link>
            {/* 二级路由的渲染入口 */}
            <Outlet/>
        </div>
    )
}

export default Layout