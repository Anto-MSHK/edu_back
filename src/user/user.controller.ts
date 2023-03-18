import { Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/get')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/get/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUser(id);
  }

  @Put('/set-active/:id')
  async setActiveUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.setActiveUser(id);
  }
}
