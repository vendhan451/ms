import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee } from '../../types/employee';

export const employeesAPI = createApi({
  reducerPath: 'employeesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => 'employees',
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `employees/${id}`,
    }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (newEmployee) => ({
        url: 'employees',
        method: 'POST',
        body: newEmployee,
      }),
    }),
    updateEmployee: builder.mutation<Employee, Partial<Employee> & Pick<Employee, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `employees/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `employees/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesAPI;