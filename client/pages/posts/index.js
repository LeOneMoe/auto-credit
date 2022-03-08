import {MainLayout} from "../../components/MainLayout";
import classes from "../../styles/posts.module.css"
import {useEffect, useState} from "react";
import {find} from "../../api/posts/find";
import {getAll} from "../../api/posts/crud";
import PostsTable from "../../components/PostsTable/PostsTable";


const Posts = ({posts: SSPosts}) => {
    const [posts, setPosts] = useState(SSPosts)

    useEffect(() => {
        async function loadPosts() {
            const data = await getAll()
            setPosts(data)
        }

        if (!posts) {
            loadPosts()
        }
    })

    if (!posts) {
        return (
            <MainLayout title={`Loading...`}>
                <div>
                    <p className={classes.spiiiiiin}>Loading...</p>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout title={`Posts`}>
            <div className={classes.count}>Found {posts.length} posts</div>

            {/*<PostsFlexContainer posts={posts}/>*/}

            <PostsTable posts={posts}/>
        </MainLayout>
    )
}

export const getServerSideProps = async ({query}) => {
    const SSPosts = await find(query)

    return {props: {posts: SSPosts}}
}

export default Posts
