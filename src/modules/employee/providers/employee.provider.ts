import { DataSource } from 'typeorm';
import { Employees } from '../entities/employee.entity';

export const employeeProviders = [
    {
        provide: 'EMPLOYEE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Employees),
        inject: ['DATA_SOURCE'],
    },
];
