import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres', // ex. postgres
    host: 'localhost', // ex. localhost
    port: 5432, // ex. 5432
    username: 'your_username', // ex. postgres
    password: 'your_password', // ex. postgres
    database: 'your_databse', // ex. taskmanagement
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // ex. [__dirname + '/../**/*.entity.{js,ts}']
    synchronize: true,
};