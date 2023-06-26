import { GuildMember } from "discord.js";
import { StringOption, MemberOption } from "necord";

export class MotivationalPhraseCommandDto {
    /**
     * The member we send the phrase to
     * @example 'Heracles421'
     */
    @MemberOption({
        name: "usuario",
        description: "El usuario al que le enviaremos la frase",
        required: false,
    })
    readonly member: GuildMember;
}
