import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import {useEffect, useState} from "react";
import {getAll, getById} from "../../api/posts/crud";

const Post = ({SSPosts}) => {
    const router = useRouter()

    const [post, setPost] = useState(SSPosts)

    useEffect(() => {
        async function loadPost() {
            const json = await getById({id: router.query.id})
            setPost(json)
        }

        if (!SSPosts) {
            loadPost()
        }
    })

    if (!post) {
        return (
            <MainLayout title={`Loading...`}>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout title={`${post.title}`}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.author}</p>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const SSPosts = await getById({id: query.id})

    return {props: {SSPosts}}
}

export default Post
