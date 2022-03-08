import classes from "../../styles/posts.module.css";
import Link from "next/link"

const PostsFlexContainer = ({posts}) => {
    return (
        <>
            <h1 className={classes.header}>Posts</h1>
            <div className={classes.postsBox}>
                {posts.map((post) => (
                    <div className={classes.post} key={post.id}>
                        <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                            <a className={classes.a}>
                                {post.title}
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PostsFlexContainer