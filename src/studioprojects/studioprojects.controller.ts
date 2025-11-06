import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { StudioProjectService } from './studioprojects.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Studioprojects } from './studioprojects.entity';

@Controller('studioprojects')
export class StudioProjectController {
  constructor(private readonly studioProjectService: StudioProjectService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'headerImage', maxCount: 1 },
        { name: 'detailImages', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${randomName}${ext}`);
          },
        }),
      },
    ),
  )
  create(
    @Body() body: any,
    @UploadedFiles()
    files: {
      headerImage?: Express.Multer.File[];
      detailImages?: Express.Multer.File[];
    },
  ) {
    return this.studioProjectService.create({
      ...(body as Partial<Studioprojects>),
      headerImage: files?.headerImage?.[0]?.filename ?? undefined,
      detailImages: files?.detailImages?.map((file) => file.filename) ?? [],
    });
  }

  @Get()
  findAll() {
    return this.studioProjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studioProjectService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'headerImage', maxCount: 1 },
        { name: 'detailImages', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${randomName}${ext}`);
          },
        }),
      },
    ),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFiles()
    files: {
      headerImage?: Express.Multer.File[];
      detailImages?: Express.Multer.File[];
    },
  ) {
    return this.studioProjectService.update(id, {
      ...(body as Partial<Studioprojects>),
      ...(files?.headerImage?.length && {
        headerImage: files.headerImage[0].filename,
      }),
      ...(files?.detailImages?.length && {
        detailImages: files.detailImages.map((file) => file.filename),
      }),
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studioProjectService.remove(id);
  }
}
