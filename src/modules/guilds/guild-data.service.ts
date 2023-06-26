import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { GuildData } from "./entities/guild-data.entity";

@Injectable()
export class GuildDataService {
    constructor(
        @InjectRepository(GuildData, "hestia")
        private guildConfigRepository: Repository<GuildData>,
    ) {}

    findAll(): Promise<GuildData[]> {
        return this.guildConfigRepository.find();
    }

    findOneById(id: string): Promise<GuildData> {
        return this.guildConfigRepository.findOneBy({ id });
    }

    findAllById(id: string): Promise<GuildData[]> {
        return this.guildConfigRepository.findBy({ id });
    }

    findAllWithKillFeeds(): Promise<GuildData[]> {
        let query = this.guildConfigRepository.createQueryBuilder().where({ kill_feed_channel: Not(IsNull()) });
        return query.getMany();
    }

    save(guildConfig: GuildData): Promise<GuildData> {
        return this.guildConfigRepository.save(guildConfig);
    }
}
