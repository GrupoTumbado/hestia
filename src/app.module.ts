import { NecordModule } from "necord";
import { IntentsBitField } from "discord.js";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";
import { CommandsModule } from "./modules/commands/commands.module";
import { EventsModule } from "./modules/events/events.module";
import { APP_FILTER } from "@nestjs/core";
import { InteractionExceptionFilter } from "./filters/interaction-exceptions.filter";
import { PaginatedEmbedService } from "./services/paginated-embed.service";
import { LoggingModule } from "./modules/logging/logging.module";
import { Log } from "./modules/logging/entities/log.entity";
import { GuildData } from "./modules/guilds/entities/guild-data.entity";
import { Joke } from "./modules/hestia/entities/joke.entity";
import { MotivationalPhrase } from "./modules/hestia/entities/motivational-phrase.entity";

@Module({
    imports: [
        CommandsModule,
        EventsModule,
        LoggingModule,
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
        NecordModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                token: configService.get("DISCORD_TOKEN"),
                intents: [IntentsBitField.Flags.Guilds],
                prefix: "/",
                //development: [configService.get("DEVELOPMENT_GUILD")],
            }),
        }),
        TypeOrmModule.forRootAsync({
            name: "hestia",
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: "mysql",
                host: configService.get("DB_HOST", "localhost"),
                port: configService.get<number>("DB_PORT", 3306),
                username: configService.get("DB_USER", "root"),
                password: configService.get("DB_PASSWORD", ""),
                database: configService.get("DB_NAME", "hestia"),
                entities: [Joke, MotivationalPhrase, GuildData, Log],
                autoLoadEntities: true,
            }),
        }),
        TypeOrmModule.forFeature([Log], "hestia"),
        ScheduleModule.forRoot(),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: InteractionExceptionFilter,
        },
        PaginatedEmbedService,
    ],
})
export class AppModule {}
