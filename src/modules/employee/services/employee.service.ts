import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employees } from '../entities/employee.entity';
import { EmployeeDTO } from '../dtos/employee.dto';
import { DataBaseReturnType } from 'src/types/databaseReturnType'
@Injectable()
export class EmployeeService {
    constructor(
        @Inject('EMPLOYEE_REPOSITORY')
        private employeeRepository: Repository<Employees>,
    ) { }

    async findAll(): Promise<Employees[]> {
        const info = this.employeeRepository.find();
        return info
    }

    async findById(id: number): Promise<Employees> {
        const info = await this.employeeRepository.findOneBy({id})
        return info
    }

    async findByRole(role: string): Promise<Employees>{
        const info = await this.employeeRepository.findOneBy({role})
        return info
    }

    async createEmployee(employeeDTO: EmployeeDTO){
        this.employeeRepository.create(employeeDTO);
        const info = await this.employeeRepository.save(employeeDTO)

        return { status: 200, data: info };
    }

    async updateEmployee(id: number, employeeDTO: EmployeeDTO): Promise<Employees> {
        const updateResult = await this.employeeRepository.update(id, employeeDTO);
        if (updateResult.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        const updatedEmployee = await this.employeeRepository.findOne({where: {id}})

        return updatedEmployee;
    }

    async delete(id: number): Promise<DataBaseReturnType>{
        const updateResult = await this.employeeRepository.delete(id)
        if (updateResult.affected === 0) {
            return updateResult as DataBaseReturnType
        }
        return updateResult as DataBaseReturnType
    }
}
