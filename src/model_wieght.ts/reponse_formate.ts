import { ModelWeight } from './model_weights';

export class ModelResponse_format {
  public userReponseFormat(startIdx: number, formatArry: number[]) {
    if (formatArry.length == 0 || formatArry.includes(startIdx)) {
        console.log({formatArry},"0");
        
      return  { $project:new ModelWeight().userTableMin() } 
    } else if (formatArry.includes(startIdx + 1)) {
        console.log({formatArry},"1");

        return  { $project:new ModelWeight().userTableMedium() } 

    }else{
     return  { $project:{ _: 0 } } 
    }
  }

  public companyResponseFormat(startIdx: number, formatArry: number[]) {
  console.log({formatArry});
  
  
    if (formatArry.length == 0 || formatArry.includes(startIdx)) {
        console.log({formatArry},"0");
        
      return  { $project:new ModelWeight().companyTableMin() } 
    } else if (formatArry.includes(startIdx + 1)) {
        console.log({formatArry},"1");

        return  { $project:new ModelWeight().companyTableMax() } 

    }else{
    return  { $project:{ _: 0 } } 
    }
  }
}
