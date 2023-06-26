import {
    ButtonBuilder,
    ButtonInteraction,
    ColorResolvable,
    CommandInteraction,
    EmbedAuthorData,
    EmbedFooterData,
    Message,
} from "discord.js";
import { EmbedField } from "./embed.field";

export class PaginatedEmbedOptions {
    interaction: CommandInteraction | ButtonInteraction;
    message?: Message;
    defaultTitle?: string;
    defaultFields?: EmbedField[];
    defaultButtons?: ButtonBuilder[];
    defaultAuthor?: EmbedAuthorData;
    defaultFooter?: EmbedFooterData;
    defaultColor?: ColorResolvable;
    defaultThumbnail?: string;
    maxFields?: number;
    disableDefaultPage?: boolean;
    queriedIdentifier?: string;
}
