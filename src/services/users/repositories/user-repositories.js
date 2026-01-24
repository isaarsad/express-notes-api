import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import AuthenticationError from '../../../exceptions/authentication-error.js';

class UserRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async createUser({ username, password, fullname }) {
    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt, updatedAt],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    return result.rows.length > 0;
  }

  async verifyUserCradential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    //destructuring id dan password dan menyimpan password di var hashedPassword agar ga bentrok sama parameternya
    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname, created_at, updated_at FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }
}

export default new UserRepositories();
