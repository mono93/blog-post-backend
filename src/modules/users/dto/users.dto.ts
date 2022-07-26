import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsString } from "class-validator";

export class UserDto {

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsString()
    userId: string | null = null;

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsString()
    firstName: string | null = null;

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsString()
    lastName: string | null = null;

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsEmail()
    email: string | null = null;

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsString()
    dateOfBirth: string | null = null;

    @ApiProperty({ type: 'string', required: true, default: "Male" })
    @IsDate()
    gender: string | null = 'Male';

    @ApiProperty({ type: 'string', required: true, default: null })
    @IsString()
    signupProvider: string | null = null;
    
}

export class VerifyEmailDto {
    @ApiProperty({ type: 'string', required: true, default: null })
    @IsEmail()
    email: string | null = null;
}