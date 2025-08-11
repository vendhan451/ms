interface Employee {
    id: number;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    hireDate: string;
}

interface EmployeeCreate {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    hireDate: string;
}

interface EmployeeUpdate {
    id: number;
    name?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    hireDate?: string;
}

export type { Employee, EmployeeCreate, EmployeeUpdate };