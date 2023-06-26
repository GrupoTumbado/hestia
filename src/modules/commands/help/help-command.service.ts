import { Injectable } from "@nestjs/common";
import { CommandInteraction } from "discord.js";
import { HestiaPaginatedEmbed } from "../../hestia/classes/hestia-paginated-embed.class";
import { PaginatedEmbedService } from "../../../services/paginated-embed.service";

@Injectable()
export class HelpCommandService {
    public async printHelpMenu(interaction: CommandInteraction): Promise<any> {
        let embed: HestiaPaginatedEmbed = await HestiaPaginatedEmbed.createAsync({
            interaction: interaction,
            defaultTitle: "Comandos",
            maxFields: 5,
        });

        embed.addField(`/chiste`, `- Obtén un chiste al azar.`);
        embed.addField(`/frase`, `- Obtén o envía una frase motivacional.`);
        return PaginatedEmbedService.registerEmbed(embed);
    }
}
