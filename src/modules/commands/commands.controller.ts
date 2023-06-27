import { Injectable, UseInterceptors } from "@nestjs/common";
import { HelpCommandService } from "./help/help-command.service";
import { Context, Options, SlashCommand, AutocompleteInterceptor, createCommandGroupDecorator, Subcommand } from "necord";
import { AutocompleteInteraction, ButtonStyle, CommandInteraction } from "discord.js";
import { JokeCommandService } from "./joke/joke-command.service";
import { MotivationalPhraseCommandService } from "./motivational-phrase/motivational-phrase-command.service";
import { MotivationalPhraseCommandDto } from "./motivational-phrase/dto/motivational-phrase-command.dto";

@Injectable()
export class CommandsController {
    constructor(
        private readonly helpCommandService: HelpCommandService,
        private readonly jokeCommandService: JokeCommandService,
        private readonly motivationalPhraseCommandService: MotivationalPhraseCommandService,
    ) {}

    @SlashCommand({
        name: "comandos",
        description: "Obtén una lista de comandos",
    })
    public async help(@Context() [interaction]: [CommandInteraction]): Promise<any> {
        return this.helpCommandService.printHelpMenu(interaction);
    }

    @SlashCommand({
        name: "chiste",
        description: "Obtén un chiste al azar",
    })
    public async getJoke(@Context() [interaction]: [CommandInteraction]) {
        return this.jokeCommandService.getJoke(interaction);
    }

    @SlashCommand({
        name: "frase",
        description: "Obtén o envía una frase motivacional",
    })
    public async getMotivationalPhrase(@Context() [interaction]: [CommandInteraction], @Options() options: MotivationalPhraseCommandDto) {
        return this.motivationalPhraseCommandService.getMotivationalPhrase(interaction, options);
    }
}
