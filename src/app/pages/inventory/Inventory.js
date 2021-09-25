import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import {callGenericGetterAsync} from '../../generic/actions';
import { connect } from 'react-redux';

const Inventory = ({dispatch}) => {
    const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);

    const mockData = {
        "page": 1,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        data: [{
                "id": 1,
                "email": "george.bluth@reqres.in",
                "first_name": "George",
                "last_name": "Bluth",
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            },
            {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            },
            {
                "id": 3,
                "email": "emma.wong@reqres.in",
                "first_name": "Emma",
                "last_name": "Wong",
                "avatar": "https://reqres.in/img/faces/3-image.jpg"
            },
            {
                "id": 4,
                "email": "eve.holt@reqres.in",
                "first_name": "Eve",
                "last_name": "Holt",
                "avatar": "https://reqres.in/img/faces/4-image.jpg"
            },
            {
                "id": 5,
                "email": "charles.morris@reqres.in",
                "first_name": "Charles",
                "last_name": "Morris",
                "avatar": "https://reqres.in/img/faces/5-image.jpg"
            },
            {
            "id": 6,
            "email": "tracey.ramos@reqres.in",
            "first_name": "Tracey",
            "last_name": "Ramos",
            "avatar": "https://reqres.in/img/faces/6-image.jpg"
        }]
    };


	const fetchUsers = async page => {
		setLoading(true);

        setTimeout(() => {
            setData(mockData?.data);
            setTotalRows(mockData.data.total);
            setLoading(false);
        }, 1000);
        // dispatch(callGenericGetterAsync(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`, (res) => {
        //     if (res) {
        //         setData(res.data.data);
        //         setTotalRows(res.data.total);
        //     }
        // }));
	};

	const handlePageChange = page => {
		fetchUsers(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

    const [columns, setColumns] = useState([
        {
            name: 'Full Name',
            selector: row => row.first_name + " " + row.last_name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Avatar',
            selector: row => <img src={row.avatar} width="50" height="50" alt={row.first_name} />,
            sortable: true,
        }
    ]);
	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
	}, []);


    const handleSort = async (column, sortDirection) => {
        console.log(column, sortDirection);
		setLoading(true);

		// instead of setTimeout this is where you would handle your API call.
		setTimeout(() => {
			// setData(orderBy(data, column.sortField, sortDirection));
            setData(mockData?.data);
			setLoading(false);
		}, 1000);
        /// reach out to some API and get new data using or sortField and sortDirection
        // e.g. https://api.github.com/search/repositories?q=blog&sort=${column.sortField}&order=${sortDirection}
    };

    return (
        <div className="mt-5">
            <DataTable
                title="Users"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                // onSort={handleSort}
                // sortServer
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state
});

export default connect(mapStateToProps)(Inventory);