import { DataSource } from 'typeorm';
import { Employees } from 'src/modules/employee/entities/employee.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'alif',
        password: '1234',
        database: 'test',
        entities: [Employees],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];