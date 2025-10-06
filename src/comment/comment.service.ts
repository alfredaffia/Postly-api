import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schema/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}
  
async create(createCommentDto: CreateCommentDto, userId: string, postId:string): Promise<Comment> {
    if (createCommentDto.replyTo) {
    const parentComment = await this.commentModel.findById(createCommentDto.replyTo);
    if (!parentComment) throw new NotFoundException('Parent comment not found');
  }
  return this.commentModel.create({ 
    ...createCommentDto,
    post:postId, 
    author: userId 
  });
}

async findAllByPost(postId: string): Promise<Comment[]> {
  return this.commentModel
    .find({ post: postId })
    .populate('author', 'email')
    .populate('replyTo');
}

async update(id: string, dto: UpdateCommentDto, userId: string): Promise<Comment> {
  const comment = await this.commentModel.findById(id);
  if (!comment) throw new NotFoundException('Comment not found');
  if (comment.author.toString() !== userId) throw new ForbiddenException('Not allowed');
  Object.assign(comment, dto);
  return comment.save();
}

// async remove(id: string, userId: string) {
//   const comment = await this.commentModel.findById(id);
//   if (!comment) throw new NotFoundException('Comment not found');
//   if (comment.author.toString() !== userId) throw new ForbiddenException('Not allowed');
//   const deleteComment = await comment.deleteOne();
//   return { message: `Comment with ${id} deleted successfully`};
// }
async remove(id: string, user: any) {
  const comment = await this.commentModel.findById(id);
  if (!comment) throw new NotFoundException('Comment not found');

  // allow if admin OR the owner
  if (comment.author.toString() !== user._id.toString() && user.role !== 'admin') {
    throw new ForbiddenException('You are not allowed to delete this comment');
  }

  await comment.deleteOne();
  return { message: `Comment with ${id} deleted successfully`};
}

}
