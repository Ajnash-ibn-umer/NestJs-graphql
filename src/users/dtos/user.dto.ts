import { ApiProperty } from "@nestjs/swagger";

export class registerUserInfo{

    @ApiProperty({
        required:true,
        description:"username or email",
        type:String
    })
    name:string;

    @ApiProperty({
        required:true,
        description:"username or email",
        type:String
    })
    email:string;
    @ApiProperty({
        required:true,
        description:"username or email",
        type:String
    })
    password:string;
}

export class loginUserData{

    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;
}