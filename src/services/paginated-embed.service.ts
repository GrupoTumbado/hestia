import { Injectable } from "@nestjs/common";
import { Button, Context } from "necord";
import { ButtonInteraction, WebhookMessageEditOptions } from "discord.js";
import { HestiaPaginatedEmbed } from "../modules/hestia/classes/hestia-paginated-embed.class";

@Injectable()
export class PaginatedEmbedService {
    private static activePaginatedEmbeds: { [key: string]: HestiaPaginatedEmbed } = {};

    public static getEmbed(id: string) {
        return PaginatedEmbedService.activePaginatedEmbeds[id];
    }

    public static disableEmbedButton(id: string, buttonId: string, options?: WebhookMessageEditOptions) {
        const paginatedEmbed = PaginatedEmbedService.activePaginatedEmbeds[id];
        if (!paginatedEmbed) return;

        let buttons = paginatedEmbed.getButtons();
        // @ts-ignore - Not ideal, but we know the property exists, it's just not exposed
        buttons = buttons.filter((buttonBuilder) => buttonBuilder.data.custom_id != buttonId);
        paginatedEmbed.setButtons(buttons);
        return paginatedEmbed.getCurPage(options);
    }

    public static async registerEmbed(embed: HestiaPaginatedEmbed, options?: WebhookMessageEditOptions, isFollowUp?: boolean) {
        const message = await embed.getCurPage(options, isFollowUp);
        embed.setMessage(message);

        PaginatedEmbedService.activePaginatedEmbeds[message.id] = embed;
        setTimeout(async () => {
            try {
                await embed.timeout();
            } catch (e) {}

            delete PaginatedEmbedService.activePaginatedEmbeds[message.id];
            embed = null;
        }, 600000);

        return message;
    }

    @Button("hestia_paginated_embed_prev_page")
    public async onPreviousPage(@Context() [interaction]: [ButtonInteraction]) {
        if (!PaginatedEmbedService.activePaginatedEmbeds[interaction.message.id]) {
            return interaction.reply({
                content: "This command has timed out. Please execute it again.",
                ephemeral: true,
            });
        } else if (interaction.message.interaction && interaction.message.interaction.user.id != interaction.user.id) {
            return interaction.reply({
                content: "Only the person who executed the command can interact with it!",
                ephemeral: true,
            });
        }
        interaction.deferUpdate();

        await PaginatedEmbedService.activePaginatedEmbeds[interaction.message.id].getPreviousPage();
    }

    @Button("hestia_paginated_embed_next_page")
    public async onNextPage(@Context() [interaction]: [ButtonInteraction]) {
        if (!PaginatedEmbedService.activePaginatedEmbeds[interaction.message.id]) {
            return interaction.reply({
                content: "This command has timed out. Please execute it again.",
                ephemeral: true,
            });
        } else if (interaction.message.interaction && interaction.message.interaction.user.id != interaction.user.id) {
            return interaction.reply({
                content: "Only the person who executed the command can interact with it!",
                ephemeral: true,
            });
        }
        interaction.deferUpdate();

        await PaginatedEmbedService.activePaginatedEmbeds[interaction.message.id].getNextPage();
    }
}
