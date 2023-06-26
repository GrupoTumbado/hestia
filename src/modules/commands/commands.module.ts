import { Module } from "@nestjs/common";
import { CommandsController } from "./commands.controller";
import { HelpCommandService } from "./help/help-command.service";
import { HestiaModule } from "../hestia/hestia.module";
import { JokeCommandService } from "./joke/joke-command.service";
import { GuildModule } from "../guilds/guild.module";
import { MotivationalPhraseCommandService } from "./motivational-phrase/motivational-phrase-command.service";

@Module({
    imports: [HestiaModule, GuildModule],
    providers: [CommandsController, HelpCommandService, JokeCommandService, MotivationalPhraseCommandService],
})
export class CommandsModule {}
