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

    @ApiProperty({
        required:true,
        description:"company information",
        type:String
    })
    company:string;


    @ApiProperty({
        required:true,
        description:"0 - basic docs ,100 - company information",
        type:String
    })
    screenType:[number];

    @ApiProperty({
        required:true,
       
        type:String
    })
    responseFormat:[number]

}

export class loginUserData{

    @ApiProperty()
    email:string;
    @ApiProperty()
    password:string;
}