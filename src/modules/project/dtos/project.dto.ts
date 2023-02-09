import { IsOptional, IsString } from "class-validator";

export class ProjectSearchQueryParams {
    @IsString()
    @IsOptional()
    roleId?: string;
  
    @IsString()
    @IsOptional()
    statusId?: string;
  }