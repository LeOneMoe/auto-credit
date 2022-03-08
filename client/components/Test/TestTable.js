import TableHead from "../TableComponents/TableHead";
import TableColumnHeader from "../TableComponents/TableColumnHeader";
import TableBody from "../TableComponents/TableBody";
import TableRow from "../TableComponents/TableRow";
import TableCell from "../TableComponents/TableCell";
import Table from "../TableComponents/Table";

const TestTable = ({testData}) => {
    return (
        <Table>
            <TableHead>
                <TableColumnHeader>mainland</TableColumnHeader>
                <TableColumnHeader>latitude</TableColumnHeader>
                <TableColumnHeader>longitude</TableColumnHeader>
                <TableColumnHeader>height</TableColumnHeader>
            </TableHead>
            <TableBody>
                {testData.map(test =>
                    <TableRow key={test.id} id={test.id}>
                        <TableCell>{test.mainland}</TableCell>
                        <TableCell>{test.latitude}</TableCell>
                        <TableCell>{test.longitude}</TableCell>
                        <TableCell>{test.height}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TestTable