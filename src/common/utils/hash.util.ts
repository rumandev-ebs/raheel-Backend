import * as bcrypt from 'bcryptjs';

export const Hash = {
  make: async (value: string) => bcrypt.hash(value, 10),
  compare: async (value: string, hash: string) => bcrypt.compare(value, hash),
};
