import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    return (
        <div>
            我是登录页
            <Link to="/article">跳转到文章页</Link>
            <button onClick={() => navigate("/article")}>跳转到文章页</button>
            <button onClick={() => navigate("/article?name=hanssb&id=123")}>query跳转到文章页</button>
            <button onClick={() => navigate("/article/123/hfd")}>path跳转到文章页</button>
        </div>
    )
}

export default Login