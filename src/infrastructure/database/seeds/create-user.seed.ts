import { User } from "src/domain/users/entities/user.entity";
import { EntityManager } from "typeorm";

export default async function createDefaultUser(manager: EntityManager) {
  const repo = manager.getRepository(User);
  const userExists = await repo.findOne({ where: { email: 'andercampo12@gmail.com' } });

  if (userExists) {
    return;
  }

  const user = new User();
  user.email = 'andercampo12@gmail.com';
  user.emailVerified = true

  await manager.save(user);
}