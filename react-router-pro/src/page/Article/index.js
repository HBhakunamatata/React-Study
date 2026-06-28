import { useParams, useSearchParams } from "react-router-dom"

const Article = () => {

    // const [searchParams] = useSearchParams()
    // const id = searchParams.get('id')
    // const name = searchParams.get('name')

    const params = useParams()
    const id = params.id
    const name = params.name

    return (
        <div>
            我是文章页,参数有name={name}, id={id}
        </div>
    )
}

export default Article

