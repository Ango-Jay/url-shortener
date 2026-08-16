import Koa from "koa";

const app = new Koa();
const port = Number(process.env.PORT) || 3000;

app.use(async (ctx) => {
  ctx.body = { message: "url-shortner" };
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
