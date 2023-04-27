import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import s from './PackList.module.scss';
import PackItem from './packItem/PackItem';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { getCards } from '../packsReducer';
import { selectPacks } from '../selectors/selectors';
import PaginationC from '../../../common/components/Pagination/PaginationC';

const PackList = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector(selectPacks);

  const totalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const page = useAppSelector((state) => state.packs.page);
  const pageCount = useAppSelector((state) => state.packs.pageCount);

  useEffect(() => {
    dispatch(getCards({ page: 1, pageCount: 4 }));
  }, []);

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(getCards({ page: pageNumber, pageCount: pageCount }));
  };

  return (
    <>
      <TableContainer className={s.tableContainer} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className={s.thead}>
              <TableCell>Name</TableCell>
              <TableCell>Cover</TableCell>
              <TableCell align='right'>Cards</TableCell>
              <TableCell sx={{ cursor: 'pointer' }} align='right'>
                Last Updated
              </TableCell>
              <TableCell align='right'>Created by</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {packs.map((el) => {
              return <PackItem key={el._id} packs={el} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationC page={page} pageCount={pageCount} totalCount={totalCount} onChangePagination={onChangePagination} />
    </>
  );
};

export default PackList;
