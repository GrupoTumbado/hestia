import { Injectable } from "@nestjs/common";
import { HestiaJokesService } from "./services/hestia-jokes.service";
import { HestiaMotivationalPhrasesService } from "./services/hestia-motivational-phrases.service";
import { Joke } from "./entities/joke.entity";
import { MotivationalPhrase } from "./entities/motivational-phrase.entity";
import { GuildDataService } from "../guilds/guild-data.service";
import { GuildData } from "../guilds/entities/guild-data.entity";

@Injectable()
export class HestiaService {
    constructor(
        private readonly hestiaJokesService: HestiaJokesService,
        private readonly hestiaMotivationalPhrasesService: HestiaMotivationalPhrasesService,
        private readonly guildDataService: GuildDataService,
    ) {}

    /**
     * Get all jokes
     */
    async getAllJokes(): Promise<Joke[]> {
        return this.hestiaJokesService.findAll();
    }

    /**
     * Get a random joke
     */
    async getRandomJoke(): Promise<Joke> {
        return this.hestiaJokesService.findOneRandom();
    }

    /**
     * Get a random joke by category
     */
    async getRandomJokeByCategory(category: string): Promise<Joke> {
        return this.hestiaJokesService.findOneRandomByCategory(category);
    }

    /**
     * Get all phrases
     */
    async getAllMotivationalPhrases(): Promise<MotivationalPhrase[]> {
        return this.hestiaMotivationalPhrasesService.findAll();
    }

    /**
     * Get a random phrases
     */
    async getRandomMotivationalPhrase(): Promise<MotivationalPhrase> {
        return this.hestiaMotivationalPhrasesService.findOneRandom();
    }

    /**
     * Get a random phrases by category
     */
    async getRandomMotivationalPhraseByCategory(category: string): Promise<MotivationalPhrase> {
        return this.hestiaMotivationalPhrasesService.findOneRandomByCategory(category);
    }

    async getGuildData(guildId: string): Promise<GuildData> {
        return this.guildDataService.findOneById(guildId);
    }

    public saveGuildData(guildData: GuildData): Promise<GuildData> {
        return this.guildDataService.save(guildData);
    }
}
