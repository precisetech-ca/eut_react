import React, {useMemo} from 'react'
import {useTable, useFilters, usePagination, useSortBy} from 'react-table';
import { Table, Button } from 'react-bootstrap';
import { ColumnFilter } from './ColumnFilter';

export const  ReactTable = ({tableData, tableColumns}) => {
    const columns = useMemo(() => tableColumns, []);
    const data = tableData

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
    }, useFilters, useSortBy, usePagination );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        canNextPage,
        canPreviousPage,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        previousPage,
    } = tableInstance;


    const {pageIndex, pageSize} = state;

    return (
        <>
            <Table 
                {...getTableProps()} 
                bordered 
                responsive={true} 
                className="react-table-container" >
                <thead>
                    {headerGroups.map(headerGroup => {
                        return (<tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup?.headers?.map(column => {
                                return (<th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
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
            
            
            <div className="d-flex table-utils-container">
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="m-1">
                    {'<<'}
                </Button> 
                <Button onClick={() => previousPage()} disabled={!canPreviousPage} className="m-1">
                    {'<'}
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage} className="m-1">
                    {'>'}
                </Button>
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="m-1">
                    {'>>'}
                </Button>
                <span className="d-flex justify-content-center">
                    <select className="ml-2" value={pageSize} onChange={ e=> setPageSize(Number(e.target.value))}>
                        {[10, 15, 25].map (pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <span className="d-flex text-white ml-2 align-items-center">
                        Items per page
                    </span>
                </span>
            </div>
        </>
    )
}
