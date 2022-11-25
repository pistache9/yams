import path from 'path';
import { fileURLToPath } from "url";

export default async function game(req, res) {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  res.sendFile(path.join(__dirname, '../views/game.html'));

}
