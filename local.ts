import app from "./src/app";
import { connectDB } from "./src/config/db";

const port = process.env.PORT || 4000;

(async () => {
    await connectDB();
    app.listen(port, () =>
        console.log(`Servidor local en http://localhost:${port}`)
    );
})();
