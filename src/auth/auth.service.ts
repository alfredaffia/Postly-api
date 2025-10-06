import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/Schema/user.schema';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async signUp(signUpDto: CreateUserDto) {
    try {
  if (!signUpDto) {
    throw new BadRequestException('Request body cannot be empty');
  }
      const { email, password, } = signUpDto;
         signUpDto.email = signUpDto.email.toLowerCase()
      const hashedPassword = await bcrypt.hash(password, 10);

      const existinguser = await this.userModel.findOne({ email: signUpDto.email })
      if (existinguser) {
        throw new ConflictException('user with this email already exist')
      }

      const UserDetails = await this.userModel.create({
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({ id: UserDetails.id, email: UserDetails.email, });


      return {
        token,
        user: { id: UserDetails.id, email: UserDetails.email, }
      };
    }
    catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User does not exist ``Invalid email`');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
const payload= { id: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }
    
}