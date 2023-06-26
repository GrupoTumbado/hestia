import { Injectable, Logger } from "@nestjs/common";
import { Context, ContextOf, On } from "necord";
import { GuildCreateService } from "./guild-create/guild-create.service";
import { ActivityType, Client } from "discord.js";

@Injectable()
export class EventsController {
    constructor(private readonly client: Client, private readonly guildCreateService: GuildCreateService) {}

    private readonly logger = new Logger(EventsController.name);

    @On("ready")
    public async DoReadyStuff(@Context() [client]: ContextOf<"ready">) {
        this.logger.log("Beginning startup setup.");
        client.guilds.cache.forEach((guild) => {
            this.guildCreateService.onGuildCreate(guild);
        });

        client.user.setActivity(`${client.guilds.cache.size} guilds.`, { type: ActivityType.Watching });
        this.logger.log("Startup setup completed.");
    }

    @On("guildCreate")
    public async guildCreate(@Context() [guild]: ContextOf<"guildCreate">) {
        this.client.user.setActivity(`${this.client.guilds.cache.size} guilds.`, { type: ActivityType.Watching });
        return this.guildCreateService.onGuildCreate(guild);
    }

    @On("guildDelete")
    public async guildDelete(@Context() [guild]: ContextOf<"guildDelete">) {
        this.client.user.setActivity(`${this.client.guilds.cache.size} guilds.`, { type: ActivityType.Watching });
    }
}
