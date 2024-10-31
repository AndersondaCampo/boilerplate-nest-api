import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { repositories } from "./repositories";
import { entities } from "./entities";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ...entities,
    ]),
  ],
  providers: [
    DatabaseService,
    ...repositories,
  ],
  exports: [
    DatabaseService,
    ...repositories,
  ],
  controllers: [],
})
export class DatabaseModule {
}