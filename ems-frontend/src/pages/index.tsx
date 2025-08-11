import React from 'react';
import { Layout } from '../components/Layout';

const Home: React.FC = () => {
    return (
        <Layout>
            <h1>Welcome to the Employee Management System</h1>
            <p>Please navigate to the employees section to manage employee data.</p>
        </Layout>
    );
};

export default Home;