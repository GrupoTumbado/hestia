import { GuildMember } from "discord.js";
import { StringOption, MemberOption } from "necord";

export class JokeCommandDto {
    /**
     * The member we will get the logs of
     * @example 'Heracles421'
     */
    @MemberOption({
        name: "user",
        description: "The user we will get the logs from",
        required: false,
    })
    readonly member: GuildMember;
}
