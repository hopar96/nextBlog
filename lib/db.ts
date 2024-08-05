import { Prisma, PrismaClient } from "@prisma/client";
import { adjustDates, convertDateToUTC } from "./date_middleware";

const singletonPrisma = () => {

  let log: (Prisma.LogLevel | Prisma.LogDefinition)[] | undefined =
    process.env.NODE_ENV !== 'production' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'];

  return new PrismaClient({
    log: log
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
