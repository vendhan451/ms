import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Employee } from '../../types/employee';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from './employeesAPI';

interface EmployeesState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeesState = {
    employees: [],
    loading: false,
    error: null,
};

export const fetchEmployeesAsync = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await fetchEmployees();
    return response;
});

export const addEmployeeAsync = createAsyncThunk('employees/addEmployee', async (newEmployee: Employee) => {
    const response = await addEmployee(newEmployee);
    return response;
});

export const updateEmployeeAsync = createAsyncThunk('employees/updateEmployee', async (updatedEmployee: Employee) => {
    const response = await updateEmployee(updatedEmployee);
    return response;
});

export const deleteEmployeeAsync = createAsyncThunk('employees/deleteEmployee', async (employeeId: number) => {
    await deleteEmployee(employeeId);
    return employeeId;
});

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployeesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch employees';
            })
            .addCase(addEmployeeAsync.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
                const index = state.employees.findIndex(employee => employee.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
                state.employees = state.employees.filter(employee => employee.id !== action.payload);
            });
    },
});

export default employeesSlice.reducer;