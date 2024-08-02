import { PrismaClient } from "@prisma/client";
import { adjustDates, convertDateToUTC } from "./date_middleware";

const singletonPrisma = () => {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
}
declare global {
  var prismaGlobal: undefined | ReturnType<typeof singletonPrisma>;
}

const db = globalThis.prismaGlobal ?? singletonPrisma();

db.$use(async (params, next) => {
  const result = await next(params);

  adjustDates(result, convertDateToUTC);

  return result;
});

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
