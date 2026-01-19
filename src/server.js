// mengimpor dotenv dan menjalankan konfigurasinya
import 'dotenv/config';
import server from './server/index.js';

//mengakses .env
const host = process.env.HOST;
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
