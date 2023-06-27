import { Injectable } from "@nestjs/common";
import { HestiaService } from "../../hestia/hestia.service";
import { CommandInteraction } from "discord.js";
import { Joke } from "../../hestia/entities/joke.entity";

@Injectable()
export class JokeCommandService {
    constructor(private readonly hestiaService: HestiaService) {}

    public async getJoke(interaction: CommandInteraction) {
        await interaction.deferReply();

        let joke: Joke = await this.hestiaService.getRandomJoke();

        return interaction.editReply(joke.joke);
    }
}
