import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Category')
@Controller('category')
export class CategoryController {}
