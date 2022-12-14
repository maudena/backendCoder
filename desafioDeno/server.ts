import { Application } from "./deps.ts";
import { router } from "./src/routes/item.routes.ts";

const app = new Application()

app.use(router.routes())

app.listen({port: 8080})
