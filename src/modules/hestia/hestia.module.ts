import { Module } from "@nestjs/common";
import { HestiaService } from "./hestia.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Joke } from "./entities/joke.entity";
import { MotivationalPhrase } from "./entities/motivational-phrase.entity";
import { HestiaJokesService } from "./services/hestia-jokes.service";
import { HestiaMotivationalPhrasesService } from "./services/hestia-motivational-phrases.service";
import { GuildModule } from "../guilds/guild.module";

@Module({
    imports: [TypeOrmModule.forFeature([Joke, MotivationalPhrase], "hestia"), GuildModule],
    providers: [HestiaService, HestiaJokesService, HestiaMotivationalPhrasesService],
    exports: [HestiaService],
})
export class HestiaModule {}
