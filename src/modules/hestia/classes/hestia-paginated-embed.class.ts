import {
    ColorResolvable,
    CommandInteraction,
    EmbedAuthorData,
    EmbedFooterData,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    WebhookMessageEditOptions,
    Message,
    ButtonInteraction,
} from "discord.js";
import { HestiaEmbed } from "./hestia-embed.class";
import { EmbedField } from "./dto/embed.field";
import { PaginatedEmbedOptions } from "./dto/paginated-embed-options.dto";
import { PaginatedEmbedInsertOptions } from "./dto/paginated-embed-insert-options.dto";

export class HestiaPaginatedEmbed {
    private readonly interaction: CommandInteraction | ButtonInteraction;
    private message: Message;
    private maxFields: number = 5;

    private defaultTitle: string = "";
    private defaultFields: EmbedField[] = [];
    private defaultButtons: ButtonBuilder[] = [];
    private defaultAuthor: EmbedAuthorData = { name: "Hestia" };
    private defaultFooter: EmbedFooterData = {
        text: "This service is brought to you by Hestia | " + Date.now().toString(36) + " | Page ",
    };
    private defaultColor: ColorResolvable = "#FFFFFF";
    private defaultThumbnail: string = null;

    private embeds: HestiaEmbed[] = [];
    private curPage = 0;

    private queriedIdentifier: string = null;

    private constructor(options: PaginatedEmbedOptions) {
        this.interaction = options.interaction;
        this.setOptions(options);
        if (!options.disableDefaultPage) this.insertNewEmbed();
    }

    public static async createAsync(options: PaginatedEmbedOptions) {
        if (options.interaction && options.interaction.deferred == false) {
            await options.interaction.deferReply();
        }

        return new HestiaPaginatedEmbed(options);
    }

    public insertNewEmbed(options: PaginatedEmbedInsertOptions = {} as PaginatedEmbedInsertOptions) {
        let newEmbed = new HestiaEmbed();
        newEmbed.setTitle(options.title || this.defaultTitle);
        newEmbed.setAuthor(options.author || this.defaultAuthor);
        newEmbed.setFooter(options.footer || this.defaultFooter);
        newEmbed.setColor(options.color || this.defaultColor);
        newEmbed.setThumbnail(options.thumbnail || this.defaultThumbnail);
        for (const field of options.fields || this.defaultFields) {
            newEmbed.addField(field.name, field.value, field.inline);
        }

        this.embeds.push(newEmbed);
        return newEmbed;
    }

    public setOptions(options: PaginatedEmbedOptions) {
        if (options.message) this.message = options.message;
        if (options.defaultTitle) this.defaultTitle = options.defaultTitle;
        if (options.defaultFields) this.defaultFields = options.defaultFields;
        if (options.defaultButtons) this.defaultButtons = options.defaultButtons;
        if (options.defaultAuthor) this.defaultAuthor = options.defaultAuthor;
        if (options.defaultFooter) this.defaultFooter = options.defaultFooter;
        if (options.defaultColor) this.defaultColor = options.defaultColor;
        if (options.defaultThumbnail) this.defaultThumbnail = options.defaultThumbnail;
        if (options.maxFields) this.maxFields = options.maxFields;
        if (options.queriedIdentifier) this.queriedIdentifier = options.queriedIdentifier;
    }

    public setMessage(message: Message) {
        this.message = message;
    }

    public setDefaultTitle(title: string) {
        this.defaultTitle = title;
    }

    public setDefaultAuthor(options: EmbedAuthorData) {
        this.defaultAuthor = options;
    }

    public setDefaultFooter(options: EmbedFooterData) {
        this.defaultFooter = options;
    }

    public setDefaultColor(color: ColorResolvable) {
        this.defaultColor = color;
    }

    public setDefaultThumbnail(thumbnail: string) {
        this.defaultThumbnail = thumbnail;
    }

    public setDefaultFields(fields: EmbedField[]) {
        this.defaultFields = fields;
    }

    public setTitle(title: string) {
        this.defaultTitle = title;

        for (const embed of this.embeds) {
            embed.setTitle(title);
        }
    }

    public setAuthor(options: EmbedAuthorData) {
        this.defaultAuthor = options;

        for (const embed of this.embeds) {
            embed.setAuthor(options);
        }
    }

    public setFooter(options: EmbedFooterData) {
        this.defaultFooter = options;

        for (const embed of this.embeds) {
            embed.setFooter(options);
        }
    }

    public setColor(color: ColorResolvable) {
        this.defaultColor = color;

        for (const embed of this.embeds) {
            embed.setColor(color);
        }
    }

    public setEmbeds(embeds: HestiaEmbed[]) {
        this.embeds = embeds;
    }

    public setButtons(buttons: ButtonBuilder[]) {
        this.defaultButtons = buttons;
    }

    public setQueriedIdentifier(identifier: string) {
        this.queriedIdentifier = identifier;
    }

    public addEmbed(embed: HestiaEmbed) {
        this.embeds.push(embed);
    }

    public addEmbeds(embeds: HestiaEmbed[]) {
        for (const embed of embeds) {
            this.embeds.push(embed);
        }
    }

    public addField(name: string, value: string, inline?: boolean): any {
        if (!this.embeds.at(-1).data.fields || this.embeds.at(-1).data.fields.length < this.maxFields + this.defaultFields.length) {
            this.embeds.at(-1).addField(name, value, inline);
        } else {
            this.insertNewEmbed().addField(name, value, inline);
        }
    }

    private getRow(disabled?: boolean) {
        const buttonsRow = new ActionRowBuilder<ButtonBuilder>();
        let buttons: ButtonBuilder[] = [];
        buttons.push(
            new ButtonBuilder()
                .setCustomId("hestia_paginated_embed_prev_page")
                .setStyle(ButtonStyle.Danger)
                .setLabel("Previous")
                .setDisabled(disabled || this.curPage <= 0),
        );
        buttons = buttons.concat(this.defaultButtons);
        buttons.push(
            new ButtonBuilder()
                .setCustomId("hestia_paginated_embed_next_page")
                .setStyle(ButtonStyle.Success)
                .setLabel("Next")
                .setDisabled(disabled || this.curPage >= this.embeds.length - 1),
        );

        buttonsRow.addComponents(buttons);

        return buttonsRow;
    }

    public getInteraction() {
        return this.interaction;
    }

    public getMessage() {
        return this.message;
    }

    public getId() {
        if (this.message) {
            return this.message.id;
        } else if (this.interaction) {
            return this.interaction.id;
        }
    }

    public getEmbeds(): HestiaEmbed[] {
        return this.embeds;
    }

    public getButtons(): ButtonBuilder[] {
        return this.defaultButtons;
    }

    public getQueriedIdentifier() {
        return this.queriedIdentifier;
    }

    private modifyCurrentPage(options?: WebhookMessageEditOptions, isFollowUp?: boolean) {
        let footerData: EmbedFooterData = { text: "" };
        Object.assign(footerData, this.defaultFooter);
        footerData.text = footerData.text + `${this.curPage + 1}/${this.embeds.length}`;
        const content = {
            ...options,
            ...{
                embeds: [this.embeds[this.curPage].setFooter(footerData)],
                components: [this.getRow()],
            },
        };

        if (isFollowUp && this.interaction) {
            return this.interaction.followUp(content);
        } else if (this.message && !this.interaction) {
            return this.message.edit(content);
        } else if (this.interaction) {
            return this.interaction.editReply(content);
        }
    }

    public async timeout() {
        let footerData: EmbedFooterData = { text: "" };
        Object.assign(footerData, this.defaultFooter);
        footerData.text = footerData.text + `${this.curPage + 1}/${this.embeds.length}`;
        const content = {
            embeds: [this.embeds[this.curPage].setFooter(footerData)],
            components: [this.getRow(true)],
        };

        if (this.message && !this.interaction) {
            return await this.message.edit(content);
        } else if (this.interaction) {
            return await this.interaction.editReply(content);
        }
    }

    public async getCurPage(options?: WebhookMessageEditOptions, isFollowUp?: boolean) {
        return await this.modifyCurrentPage(options, isFollowUp);
    }

    public async getNextPage(options?: WebhookMessageEditOptions) {
        if (this.curPage < this.embeds.length - 1) this.curPage++;
        return await this.modifyCurrentPage(options);
    }

    public async getPreviousPage(options?: WebhookMessageEditOptions) {
        if (this.curPage > 0) this.curPage--;
        return await this.modifyCurrentPage(options);
    }
}
