import "dotenv/config";

import app from "./app.js";
import { initDBConnection } from "./db.js";

async function bootstrap() {
  try {
    await initDBConnection();

    app.listen(8080, () => {
      console.log("server started on port 8080");
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
