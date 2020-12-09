import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Response, UseInterceptors, UploadedFiles, Inject } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/index';
import { USER_REPOSITORY , POST_REPOSITORY} from '../../core/constants';
import { User } from '../users/user.entity';
import { resolve } from 'path';
import { existsSync, mkdirSync,copyFileSync, unlinkSync } from 'fs';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof PostEntity) { }

    @Post('create')
    @UseInterceptors(
            FilesInterceptor('image', null, {
                storage: diskStorage({
                    destination: './upload',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            }),
    )
    async create(@UploadedFiles() files,@Body() post: PostDto, @Request() req, @Response() res) {
        var id = req.body.id;
        const data =  await this.userRepository.findOne({
            where: { id },
        });
        let filepath = resolve(__dirname, '../../../');
        filepath = filepath+'/upload'
        let newPath = filepath+'/'+data.firstName
        if (!existsSync(newPath)) {
            mkdirSync(newPath);
        }
        const response = [];
        files.forEach(async file => {
            let oldPath = filepath+'/'+file.filename
            copyFileSync(oldPath, newPath+'/'+file.filename)
            unlinkSync(oldPath)
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse.filename);
        });
        
        let postDetails = {
            image : response,
            tags : post.tags
        }
        return await this.postService.create(postDetails,req.body.IsResourceOwner, req.body.id,res);
    }
}
