import { EmbedBuilder, EmbedData } from "discord.js";

export class HestiaEmbed extends EmbedBuilder {
    constructor(data?: EmbedData) {
        super(data);
        this.setAuthor({ name: "Hestia" });
        this.setColor("#FFFFFF");
        this.setTitle("Query Results");
        this.setFooter({
            text: "This service is brought to you by Hestia | " + Date.now().toString(36),
        });
    }

    public addField(name: string, value: string, inline?: boolean) {
        super.addFields([
            {
                name: name,
                value: value,
                inline: inline,
            },
        ]);
    }
}
