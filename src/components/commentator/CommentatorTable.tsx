import {
  Box,
  Paper,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSpreadSheetAPI } from '../../hooks/useSpreadSheetAPI';
import { useRecoilState } from 'recoil';
import { commentatorSelectedRowId } from '../../store/atomCommentator';

export function CommentatorTable() {
  const { spreadSheetAPI } = useSpreadSheetAPI();

  const [selectedRowId, setSelectedRowId] = useRecoilState(commentatorSelectedRowId);

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <TableContainer sx={{ width: 600, height: 390 }} component={Paper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>{/* ラジオボタン用のセル */}</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Tag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spreadSheetAPI.map((row, i) => (
                <TableRow
                  key={i}
                  hover
                  onClick={() => {
                    setSelectedRowId(i);
                  }}
                >
                  <TableCell padding="checkbox">
                    <Radio checked={selectedRowId === i} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.account}</TableCell>
                  <TableCell>{row.tag}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}
