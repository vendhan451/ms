import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Employee } from '../types/employee';

const EmployeeList: React.FC = () => {
    const employees = useSelector((state: RootState) => state.employees.list);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <Table<Employee>
            dataSource={employees}
            columns={columns}
            rowKey="id"
        />
    );
};

export default EmployeeList;