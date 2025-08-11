import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import EmployeeList from '../../components/EmployeeList';
import Layout from '../../components/Layout';

const EmployeesPage: React.FC = () => {
    const employees = useSelector((state: RootState) => state.employees.list);

    return (
        <Layout>
            <h1>Employee List</h1>
            <EmployeeList employees={employees} />
        </Layout>
    );
};

export default EmployeesPage;