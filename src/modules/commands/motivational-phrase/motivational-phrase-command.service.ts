import { Injectable } from "@nestjs/common";
import { HestiaService } from "../../hestia/hestia.service";
import { APIInteractionGuildMember, AttachmentBuilder, CommandInteraction, GuildMember } from "discord.js";
import { MotivationalPhraseCommandDto } from "./dto/motivational-phrase-command.dto";
import { HestiaEmbed } from "../../hestia/classes/hestia-embed.class";

@Injectable()
export class MotivationalPhraseCommandService {
    constructor(private readonly hestiaService: HestiaService) {}
}
