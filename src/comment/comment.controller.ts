import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRole } from '../user/enum/user.role.enum';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

@UseGuards(AuthGuard('jwt'))
@Post(':postId')
createComment(
  @Param('postId') postId: string,
  @Body() createCommentDto: CreateCommentDto,
  @Req() req
) {
  return this.commentService.create(createCommentDto, req.user._id, postId);
}


@Get('post/:postId')
findAllByPost(@Param('postId') postId: string) {
  return this.commentService.findAllByPost(postId);
}

@Patch(':id')
update(@Param('id') id: string, @Body() dto: UpdateCommentDto, @Req() req) {
  return this.commentService.update(id, dto, req.user._id);
}

@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRole.ADMIN,UserRole.USER)
@Delete(':id')
remove(@Param('id') id: string, @Req() req) {
  return this.commentService.remove(id, req.user._id);
}

}
