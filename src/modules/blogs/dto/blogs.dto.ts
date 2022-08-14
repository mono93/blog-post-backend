import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class GetBlogDetailsDto {
    @ApiProperty({ type: 'string', required: true, default: null })
    @IsEmail()
    email: string | null = null;
}