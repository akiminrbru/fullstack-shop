import { IsEmail } from "class-validator";

export class SendPassConfirmDto {
    @IsEmail()
    mailTo: string;
    code: number;
}