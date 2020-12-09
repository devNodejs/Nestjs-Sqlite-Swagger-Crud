import { Injectable, Inject, UseInterceptors } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize'
@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) { }

    async create(user: UserDto, res): Promise<User> {
        const createData = await this.userRepository.create<User>(user);
        return res.status(201).send({
            code: 201,
            message: 'User Created Successfully',
            data: createData,
            error: [],
        });
    }
}
