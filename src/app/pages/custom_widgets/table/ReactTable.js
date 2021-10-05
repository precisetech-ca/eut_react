import React, {useMemo} from 'react'
import {useTable, useFilters, usePagination} from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { ColumnFilter } from './ColumnFilter';


export const  ReactTable = ({tableData, tableColumns}) => {
    const columns = useMemo(() => tableColumns, []);
    const data = tableData

    console.log(data, tableData);
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter,
        }
    }, []);

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {
            pageIndex: 0
        }
    }, useFilters, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        previousPage,
    } = tableInstance;


    const {pageIndex, pageSize} = state;

    return (
        <>
            <Table {...getTableProps()} striped bordered hover size="sm" responsive={true} >
                <thead>
                    {headerGroups.map(headerGroup => {
                        return (<tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup?.headers?.map(column => {
                                return (<th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                    <div>{column.canFilter ? column.render('Filter') : ''}</div>
                                </th>);
                            })}
                        </tr>);
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page?.map(row => {
                        prepareRow(row);
                        return <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>;
                    })}
                </tbody>
                
            </Table>
            <span className="d-flex justify-content-center">
                <strong className="d-flex justify-content-center ml-1 mr-1 " style={{alignItems: "center"}}>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
                <select value={pageSize} onChange={ e=> setPageSize(Number(e.target.value))}>
                    {[10, 15, 25].map (pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </span>
            
            <div className="d-flex justify-content-center">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="m-1">
                    {'<<'}
                </Button> 
                <Button onClick={() => previousPage()} disabled={!canPreviousPage} className="m-1">
                    Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage} className="m-1">
                    Next
                </Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="m-1">
                    {'>>'}
                </Button>
            </div>
        </>
    )
}
