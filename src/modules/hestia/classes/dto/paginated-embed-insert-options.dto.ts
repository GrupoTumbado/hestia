import { ColorResolvable, EmbedAuthorData, EmbedFooterData } from "discord.js";
import { EmbedField } from "./embed.field";

export class PaginatedEmbedInsertOptions {
    title?: string;
    fields?: EmbedField[];
    author?: EmbedAuthorData;
    footer?: EmbedFooterData;
    color?: ColorResolvable;
    thumbnail?: string;
}
