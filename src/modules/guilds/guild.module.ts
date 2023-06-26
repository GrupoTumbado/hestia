import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuildData } from "./entities/guild-data.entity";
import { GuildDataService } from "./guild-data.service";

@Module({
    imports: [TypeOrmModule.forFeature([GuildData], "hestia")],
    providers: [GuildDataService],
    exports: [GuildDataService],
})
export class GuildModule {}
