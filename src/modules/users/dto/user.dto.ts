import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName : string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly IsResourceOwner: string;
}
