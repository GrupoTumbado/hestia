import { Injectable } from "@nestjs/common";
import { HestiaService } from "../../hestia/hestia.service";
import { CommandInteraction } from "discord.js";
import { MotivationalPhraseCommandDto } from "./dto/motivational-phrase-command.dto";
import { MotivationalPhrase } from "../../hestia/entities/motivational-phrase.entity";

@Injectable()
export class MotivationalPhraseCommandService {
    constructor(private readonly hestiaService: HestiaService) {}

    public async getMotivationalPhrase(interaction: CommandInteraction, options: MotivationalPhraseCommandDto) {
        await interaction.deferReply();

        let motivationalPhrase: MotivationalPhrase = await this.hestiaService.getRandomMotivationalPhrase();

        if (options.member) {
            return interaction.editReply(`<@${options.member.id}> ${motivationalPhrase.phrase}`);
        } else {
            return interaction.editReply(motivationalPhrase.phrase);
        }
    }
}
