import { createClient } from 'redis';

class CacheService {
  constructor() {
    this._client = createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this._client.on('error', (error) => {
      console.log(error);
    });

    this._client.connect();
  }

  // Method wrapper untuk menyimpan data
  async set(key, value, expirationInSeconds = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSeconds, // Set expiration biar gak jadi sampah abadi
    });
  }

  // Method wrapper untuk mengambil data
  async get(key) {
    const result = await this._client.get(key);
    return result;
  }

  // Method wrapper untuk menghapus data
  async delete(key) {
    return await this._client.del(key);
  }
}

export default CacheService;
