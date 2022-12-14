import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Item } from "../types/item.types.ts";

const DB_ITEMS: Item[] = [];
DB_ITEMS.push({ uuid: "1", name: "Gibson Les Paul", price: 200000, description:"Guitarra electrica con dos microfonos Humbucker" });
DB_ITEMS.push({ uuid: "2", name: "Fender Telecaster", price: 190000, description:"Guitarra electrica versatil, un microfono Humbucker y otro Single Coil"  });
DB_ITEMS.push({ uuid: "3", name: "Fender Stratocaster", price: 195000, description:"Guitarra electrica versatil, tres pastillas Stratocaster de bobina simple V-Mod II" });
DB_ITEMS.push({ uuid: "4", name: "Fender Jazzmaster", price: 210000, description:"Guitarra electrica versatil, dos pastillas de una sola bobina Jazzmaster de los años 60. Trémolo y puente flotante de Jazzmaster." });

export const findAll = async (ctx: Context) => {
  try {
    ctx.response.status = 200;
    logger.debug(`status: ${ctx.response.status} method: findAll handler`);

    ctx.response.body = await { code: "00", data: DB_ITEMS };
  } catch (error) {
    ctx.response.status = 500;

    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { code: "99", msg: error };
  }
};

export const findItem = async (ctx: Context) => {
  try {
    const { productId } = helpers.getQuery(ctx, { mergeParams: true });
    const item = await DB_ITEMS.find((u) => u.uuid == productId);

    if (item) {
      ctx.response.body = await { code: "00", data: item };
    } else {
      ctx.response.body = await {
        code: "01",
        msg: `Producto con id ${productId} no encontrado.`,
      };
    }
  } catch (error) {
    ctx.response.status = 500;

    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { code: "99", msg: error };
  }
};

export const createItem = async (ctx: Context) => {
  try {
    ctx.response.status = 201;
    logger.debug(`status: ${ctx.response.status} method: createItem handler`);

    const { name, price, description } = await ctx.request.body().value;

    const newId = Number(DB_ITEMS[DB_ITEMS.length - 1].uuid) + 1;
    const item: Item = {
      uuid: newId.toString(),
      name: name,
      price: price,
      description: description
    };
    DB_ITEMS.push(item);

    ctx.response.body = await { code: "00", data: item };
  } catch (error) {
    ctx.response.status = 500;

    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { code: "99", msg: error };
  }
};

export const updateItem = async (ctx: Context) => {
  try {
    ctx.response.status = 202;
    logger.debug(`status: ${ctx.response.status} method: updateItem handler`);

    const { productId } = helpers.getQuery(ctx, { mergeParams: true });
    const itemIndex = await DB_ITEMS.findIndex((u) => u.uuid == productId);

    if (itemIndex) {
      const { name, price, description } = await ctx.request.body().value;
      DB_ITEMS.splice(itemIndex, 1, {
        uuid: productId,
        name,
        price: price,
        description: description
      });

      ctx.response.body = {
        code: "00",
        data: { uuid: productId, name, price, description },
      };
    } else {
      ctx.response.body = {
        code: "01",
        msg: `Producto con id ${productId} no encontrado.`,
      };
    }
  } catch (error) {
    ctx.response.status = 500;

    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};

export const deleteItem = async (ctx: Context) => {
  try {
    ctx.response.status = 200;
    logger.debug(`status: ${ctx.response.status} method: deleteItem handler`);

    const { productId } = helpers.getQuery(ctx, { mergeParams: true });
    const itemIndex = await DB_ITEMS.findIndex((u) => u.uuid == productId);

    if (itemIndex) {
      DB_ITEMS.splice(itemIndex, 1);

      ctx.response.body = {
        code: "00",
        msg: `Producto con id ${productId} eliminado`,
      };
    } else {
      ctx.response.body = {
        code: "01",
        msg: `Producto con id ${productId} no encontrado.`,
      };
    }
  } catch (error) {
    ctx.response.status = 500;

    logger.error(`status: ${ctx.response.status} ${error}`);
    ctx.response.body = { msg: error };
  }
};