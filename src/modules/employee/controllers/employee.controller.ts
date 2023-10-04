import { Body, Controller, Get, Post, Delete, Req, Res, Next, Put, Param } from '@nestjs/common';
import { Response, Request, response } from 'express';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDTO } from '../dtos/employee.dto';
import { NOT_FOUND, REQUEST_ERROR, SUCCESS } from 'src/shared/constants/httpCodes';
import { notFound, requestInvalid, success } from 'src/helpers/http';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/role/role.enum';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Get()
    @Roles(Role.Admin)
    async findAll(        
        @Req() _request: Request,
        @Res() response: Response
    ){
        try {
            const data: any = await this.employeeService.findAll()
            if (data.length === 0) {
                return response
                .status(404)
                .json(notFound('Currently there is no employee'));
            }
            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Get('id/:id')
    async findById(
        @Req() _request: Request,
        @Res() response: Response,
        @Param('id') id: number,
    ) {
        try {
            const data: unknown = await this.employeeService.findById(id)
            if (data === null) {
                return response
                    .status(404)
                    .json(notFound('Currently there is no employee'));
            }
            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }
    @Get('role/:role')
    async findByRole(
        @Req() _request: Request,
        @Res() response: Response,
        @Param('role') role: string
    ){
        try {
            const data : unknown = await this.employeeService.findByRole(role)
            if(data === null){
                return response
                .status(404)
                .json(notFound("No employees found for this role")) ;
            }
            return response.status(SUCCESS).json(success(data)) ;
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error))
        }
    }
    
    @Post()
    async createEmployee(
        @Req() _request: Request,
        @Res() response: Response, 
        @Body() employeeDTO: EmployeeDTO
        ) {
            try {
                const data: any = this.employeeService.createEmployee(employeeDTO)

                if (data?.status === 400)
                    return response.status(REQUEST_ERROR).json(requestInvalid(data))

                return response.status(SUCCESS).json(success(data))
            } catch (error) {
                return response.status(REQUEST_ERROR).json(requestInvalid(error));
            }
    }

    @Put(':id')
    async employeeUpdate(
        @Req() _request: Request,
        @Res() response: Response,
        @Param('id') id: number,
        @Body() employeeDTO: EmployeeDTO
        ){
            try {
                const data = await this.employeeService.updateEmployee(id, employeeDTO);
                
                return response.status(SUCCESS).json(success(data))
            } catch (error) {
                return response.status(REQUEST_ERROR).json(requestInvalid(error));
            }
        }

    @Delete(':id')
    async employeeDelete(
        @Req() _request: Request,
        @Res() response: Response,
        @Param('id') id: number
    ) {
        try {
            const data = await this.employeeService.delete(id)
            if (data.affected === 0) {
                return response
                    .status(404)
                    .json(notFound(`Employee with ID ${id} not found`));
            }

            return response.status(SUCCESS).json(success(`Employee with ID ${id} has been deleted`))
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }
}
