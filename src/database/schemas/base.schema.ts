import { User, UserSchema } from 'src/modules/users/schemas/user.schema';

export const ENTITIES = [
  { name: User.name, schema: UserSchema },
];