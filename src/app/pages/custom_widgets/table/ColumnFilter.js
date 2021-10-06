import React, {useState} from 'react'
import { useAsyncDebounce } from 'react-table'
import { Input } from 'reactstrap';

export const ColumnFilter = (props) => {
    const {filterValue, setFilter} = props.column;

    const [value, setValue] = useState(filterValue);

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined);
    }, 1000);

    return (
        <span>
            <input 
                value={value || ''} 
                placeholder={props.column.id}
                className="form-control form-control-sm"
                onChange={e => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }} 
            />
            {/* <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} /> */}
        </span>
    ) 
}
