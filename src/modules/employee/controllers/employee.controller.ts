import { Body, Controller, Get, Post, Delete, Req, Res, Next, Put, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { EmployeeService } from '../services/employee.service';
import { EmployeeDTO } from '../dtos/employee.dto';
import { NOT_FOUND, REQUEST_ERROR, SUCCESS } from 'src/shared/constants/httpCodes';
import { notFound, requestInvalid, success } from 'src/helpers/http';

@Controller('employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    // @Get()
    // async findAll(
    //     @Req() request: Request,
    //     @Res() response: Response
    // ) {
    //     try {
    //         const data: any = await this.employeeService.findAll()
    //         if (data.length === 0) {
    //             return response
    //             .status(404)
    //             .json(notFound('Currently there is no employee'));
    //         }
    //         return response.status(SUCCESS).json(success(data));
    //     } catch (error) {
    //         console.log(error);
    //         return response.status(REQUEST_ERROR).json(requestInvalid(error));
    //     }
    // }

    // @Get(':id')
    // async findById(
    //     @Req() request: Request,
    //     @Res() response: Response,
    //     @Param('id') id: number,
    // ) {
    //     try {
    //         const data: any = await this.employeeService.findById(id)
    //         if (data === null) {
    //             return response
    //                 .status(404)
    //                 .json(notFound('Currently there is no employee'));
    //         }
    //         return response.status(SUCCESS).json(success(data));
    //     } catch (error) {
    //         return response.status(REQUEST_ERROR).json(requestInvalid(error));
    //     }
    // }

    @Post()
    async createEmployee(
        @Req() request: Request,
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

    // @Put(':id')
    // async employeeUpdate(
    //     @Req() request: Request,
    //     @Res() response: Response,
    //     @Param('id') id: number,
    //     @Body() employeeDTO: EmployeeDTO
    //     ){
    //         try {
    //             const data = await this.employeeService.updateEmployee(id, employeeDTO);
                
    //             return response.status(SUCCESS).json(success(data))
    //         } catch (error) {
    //             return response.status(REQUEST_ERROR).json(requestInvalid(error));
    //         }
    //     }

    // @Delete(':id')
    // async employeeDelete(
    //     @Req() request: Request,
    //     @Res() response: Response,
    //     @Param('id') id: number
    // ) {
    //     try {
    //         const data = await this.employeeService.delete(id)
    //         if (data.affected === 0) {
    //             return response
    //                 .status(404)
    //                 .json(notFound(`Employee with ID ${id} not found`));
    //         }

    //         return response.status(SUCCESS).json(success(`Employee with ID ${id} has been deleted`))
    //     } catch (error) {
    //         return response.status(REQUEST_ERROR).json(requestInvalid(error));
    //     }
    // }
}
