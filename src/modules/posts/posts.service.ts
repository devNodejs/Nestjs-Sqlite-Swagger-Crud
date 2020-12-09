import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { POST_REPOSITORY } from '../../core/constants';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
    ){}

    async create(post, IsResourceOwner, userId, res): Promise<Post> {
        if(IsResourceOwner == "true"){
            let tagData:any = post.tags.split(",");
            if(tagData.length > 10){
                return res.status(404).send({
                    code: 404,
                    message: 'Tags cannot be more than 10. currently it is '+ tagData.length,
                    data: [],
                    error: [],
                });
            }
            const createData = await this.postRepository.create<Post>({ ...post, userId });
            return res.status(201).send({
                code: 201,
                message: 'Created Successfully',
                data: createData,
                error: [],
            });
        } else {
            return res.status(404).send({
                code: 404,
                message: 'You are eligible for create post you just like this post',
                data: [],
                error: [],
            });
        }
    }
}
