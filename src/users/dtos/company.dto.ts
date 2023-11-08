import { ApiProperty } from "@nestjs/swagger";

export class companyDto{

  
     @ApiProperty({
        required:true,
        description:"company information",
        type:String
    })
    companyName: string;
    
     @ApiProperty({
        required:true,
        description:"company information",
        type:String
    })
    industry: string;
  
     @ApiProperty({
        required:true,
        description:"company information",
        type:String
    })
    ownerName: string;
}

