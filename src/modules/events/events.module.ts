import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { HestiaModule } from "../hestia/hestia.module";
import { GuildModule } from "../guilds/guild.module";
import { GuildCreateService } from "./guild-create/guild-create.service";

@Module({
    imports: [HestiaModule, GuildModule],
    providers: [EventsController, GuildCreateService],
})
export class EventsModule {}
