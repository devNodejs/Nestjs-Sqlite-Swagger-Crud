import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Request, Response, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    async create(@Body() user: UserDto, @Request() req, @Response() res): Promise<UserEntity> {
        let userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            IsResourceOwner: user.IsResourceOwner,
        }
        return await this.usersService.create(userDetails,res);
    }

}
