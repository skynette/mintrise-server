import * as jwt from 'jsonwebtoken';
import { signTransactionsToronet } from './auth.helper';
import {
  type MintriseRegisterUserToronet,
  type LoginToronet,
  type MintriseRegisterProjectToronet,
} from './auth.trpe';
import db from '@/lib/prisma';
import environment from '@/lib/environment';
import { generateRefferalCode } from '@/lib/refferal-code';

const { jwtSecret } = environment;

export default class Service {
  public async toronetLogin(data: LoginToronet) {
    try {
      const { address, password } = data;
      console.log({ address, password });
      const result = await signTransactionsToronet(address, password);
      if (result.result) {
        const address = result?.message?.slice(1, 43);
        const user = await db.user.findUnique({
          where: { address, disabled: { not: true } },
        });
        if (!user) {
          return { result: false, error: 'User not found' };
        }
        const token = jwt.sign({ address }, jwtSecret, {
          expiresIn: '1h',
        });
        return {
          result: true,
          token,
          address,
          user,
          message: 'Logged in suucefully',
        };
      }
      return result;
    } catch (e) {
      return { result: false, error: 'issues logining toronet account' };
    }
  }

  public async mintriseUserRegister(data: MintriseRegisterUserToronet) {
    try {
      const { address, password, userName, profileImage, referrerId } = data;
      const regex = /^[a-zA-Z0-9_]+$/;
      if (!regex.test(userName)) {
        return {
          result: false,
          error: 'username can only be alphanumeric and have only uderscore',
        };
      }
      const username = await db.user.findUnique({ where: { userName } });
      if (username) {
        return {
          result: false,
          message: 'nickname in use',
        };
      }
      if (referrerId) {
        const reff = await db.user.findUnique({
          where: { refferralId: referrerId },
        });
        if (!reff) {
          return { result: false, message: 'refferal code invalid' };
        }
      }
      const result = await signTransactionsToronet(address, password);
      if (result.result) {
        const address = result?.message?.slice(1, 43);
        let user;
        user = await db.user.findUnique({
          where: { address, disabled: { not: true } },
        });
        if (!user) {
          const refferralId = await generateRefferalCode();
          user = await db.user.create({
            data: {
              address,
              userName,
              profileImage,
              refferralId,
              referrerId,
            },
          });
        }
        const token = jwt.sign({ address }, jwtSecret, {
          expiresIn: '1h',
        });
        return {
          result: true,
          token,
          address,
          user,
          message: 'Logged in suucefully',
        };
      }
      return result;
    } catch (e) {
      return { result: false, error: 'issues logining toronet account' };
    }
  }

  public async mintriseProjectRegister(data: MintriseRegisterProjectToronet) {
    try {
      const {
        address,
        password,
        userName,
        profileImage,
        referrerId,
        country,
        companyName,
        companyWebsite,
        phoneNumber,
      } = data;
      const regex = /^[a-zA-Z0-9_]+$/;
      if (!regex.test(userName)) {
        return {
          result: false,
          error: 'username can only be alphanumeric and have only uderscore',
        };
      }
      const username = await db.user.findUnique({ where: { userName } });
      if (username) {
        return {
          result: false,
          message: 'nickname in use',
        };
      }
      if (referrerId) {
        const reff = await db.user.findUnique({
          where: { refferralId: referrerId },
        });
        if (!reff) {
          return { result: false, message: 'refferal code invalid' };
        }
      }
      const result = await signTransactionsToronet(address, password);
      if (result.result) {
        const address = result?.message?.slice(1, 43);
        let user;
        user = await db.user.findUnique({
          where: { address, disabled: { not: true } },
        });
        if (!user) {
          const refferralId = await generateRefferalCode();
          user = await db.user.create({
            data: {
              address,
              userName,
              country,
              companyName,
              companyWebsite,
              phoneNumber,
              role: 'PROJECT',
              profileImage,
              refferralId,
              referrerId,
            },
          });
        }
        const { jwtSecret } = environment;
        const token = jwt.sign({ address }, jwtSecret, {
          expiresIn: '1h',
        });
        return {
          result: true,
          token,
          address,
          user,
          message: 'Logged in suucefully',
        };
      }
      return result;
    } catch (e) {
      return { result: false, error: 'issues logining toronet account' };
    }
  }
}
