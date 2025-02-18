import { config as configDotenv } from 'dotenv';
import server from './server';
import { printAppInfo } from './utils/print-app-info';
import prismaClient from '@/lib/prisma';
import environment from '@/lib/environment';

configDotenv();

server.listen(process.env.PORT, () => {
  const { port, env } = environment;
  printAppInfo(port, env);
});

process.on('SIGINT', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  prismaClient.$disconnect();
  console.log('Prisma Disconnected.');
  process.exit(0);
});
