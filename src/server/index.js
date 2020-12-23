import Koa from "koa";
import koaStatic from "koa-static";
import KoaRoute from "koa-route";
import fs from "fs";
import path from "path";
import { Console } from "console";


const HTTP_PORT = process.env.HTTP_PORT || 80;
const console = new Console(process.stdout);
const app = new Koa();
const CLIENT_ROOT = path.resolve(".", "client");

app.use(KoaRoute.head('/', async (ctx) => {
  ctx.status = 200;
}))
app.use(KoaRoute.get('/status', async (ctx) => {
  ctx.status = 200;
  ctx.body = { date: new Date(), sha: "", version: "" }
}))

app.use(koaStatic(CLIENT_ROOT));

app.use(KoaRoute.get("/*", async (ctx) => {
  ctx.type = "html";
  ctx.set("Cache-control", 'no-cache no-store must-revalidate');
  ctx.set("Pragma", "no-cache");
  ctx.set("Expires", "0");
  ctx.body = fs.createReadStream(path.resolve(".", "client", "index.html"))
}));

const httpServer = app.listen(HTTP_PORT, () => {
  console.log(3);
  process.on("SIGTTIN", () => {
    httpServer.close(err => {
      process.exit(err ? 1 : 0);
    })
  })

  if (process.send) {
    process.send("read");
  }
})