import { Controller, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MonthHistoryService } from '../services/month-history.service';

import { AccountBank } from '@app/core/interfaces/account-bank.interface';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const multerOptions: MulterOptions = {
  storage: multer.memoryStorage(), // Store file in memory
};

@ApiTags('Account bank Month history')
@Controller('account-bank-month-history')
export class MonthHistoryController {
  constructor(private readonly monthHistory: MonthHistoryService) { }

  @Post('upload-csv/:accountBankId')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response, @Param('accountBankId') accountBankId: AccountBank['_id']) {
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No file uploaded' });
    }

    return this.monthHistory.saveCSVBankStattement(file, accountBankId);
  }
}
