import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { TypeOrmModule } from "@nestjs/typeorm";
@Global()
@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
  controllers: [],
})
export class DatabaseModule {
}