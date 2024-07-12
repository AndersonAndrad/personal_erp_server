import { Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as csvParser from 'csv-parser';
import { Response } from 'express';
import { Readable } from 'stream';
import { MonthHistoryService } from '../services/month-history.service';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';

export const multerOptions: MulterOptions = {
  storage: multer.memoryStorage(), // Store file in memory
};

@ApiTags('Account bank Month history')
@Controller('account-bank-month-history')
export class MonthHistoryController {
  constructor(private readonly monthHistory: MonthHistoryService) {}

  @Post('upload-csv')
  @UseInterceptors(FileInterceptor('file', multerOptions)) // Use Multer options for in-memory storage
  @ApiConsumes('multipart/form-data') // Indicate the content type
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
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No file uploaded' });
    }

    const results = [];
    const readableStream = new Readable();
    readableStream.push(file.buffer); // Push file buffer to the readable stream
    readableStream.push(null); // End the stream

    readableStream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        return res.status(HttpStatus.OK).json({
          message: 'File processed successfully',
          data: results,
        });
      })
      .on('error', (error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Error processing file',
          error: error.message,
        });
      });
  }
}
