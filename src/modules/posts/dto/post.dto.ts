import { IsNotEmpty, MinLength } from 'class-validator';

export class PostDto {
    readonly tags: string;
}
