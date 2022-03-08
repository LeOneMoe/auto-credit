import TableHead from "../TableComponents/TableHead";
import TableColumnHeader from "../TableComponents/TableColumnHeader";
import TableBody from "../TableComponents/TableBody";
import TableRow from "../TableComponents/TableRow";
import TableCell from "../TableComponents/TableCell";
import Table from "../TableComponents/Table";

const PostsTable = ({posts}) => {
    return (
        <Table>
            <TableHead>
                <TableColumnHeader>Author</TableColumnHeader>
                <TableColumnHeader>Content</TableColumnHeader>
            </TableHead>
            <TableBody>
                {posts.map(post =>
                    <TableRow key={post.id} id={post.id}>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{post.content}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default PostsTable
