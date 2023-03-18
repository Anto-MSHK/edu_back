import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Sequelize } from 'sequelize';

@Injectable()
export class AppService {
  constructor(@Inject('db_connect') private sequelize: Sequelize) {}

  async generateMockData(): Promise<string> {
    let content = readFileSync(
      join(__dirname, '../mock_data/users.sql'),
      'utf8',
    );
    await this.sequelize.query(content);
    content = readFileSync(join(__dirname, '../mock_data/groups.sql'), 'utf8');
    await this.sequelize.query(content);
    content = readFileSync(join(__dirname, '../mock_data/lessons.sql'), 'utf8');
    await this.sequelize.query(content);
    return 'Данные успешно сгенерированны!';
  }
}
