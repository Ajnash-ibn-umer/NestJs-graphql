import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ required: true })
  companyName: string;
  
  @Prop({ required: true })
  industry: string;

  @Prop({ required: true })
  ownerName: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
