// custom-types.d.ts
import { type User } from '@prisma/client'; // Adjust the import to match your project's structure

declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Add the user property to the Request interface
  }
}
