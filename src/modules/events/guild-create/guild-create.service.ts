import { Injectable } from "@nestjs/common";
import { Guild } from "discord.js";
import { GuildDataService } from "../../guilds/guild-data.service";
import { GuildData } from "../../guilds/entities/guild-data.entity";

@Injectable()
export class GuildCreateService {
    constructor(private readonly guildConfigService: GuildDataService) {}

    public async onGuildCreate(guild: Guild) {
        let guildConfig = await this.guildConfigService.findOneById(guild.id);
        if (guildConfig) {
            guildConfig.members = guild.members.cache.size;
            await this.guildConfigService.save(guildConfig);
            return true;
        }

        guildConfig = new GuildData();
        guildConfig.id = guild.id;
        guildConfig.guild_name = guild.name;
        guildConfig.guild_owner = guild.ownerId;
        guildConfig.members = guild.members.cache.size;

        await this.guildConfigService.save(guildConfig);
        return true;
    }
}
