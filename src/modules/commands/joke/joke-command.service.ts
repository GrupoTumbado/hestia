import { Injectable } from "@nestjs/common";
import { HestiaService } from "../../hestia/hestia.service";
import { APIInteractionGuildMember, AttachmentBuilder, CommandInteraction, GuildMember } from "discord.js";
import { JokeCommandDto } from "./dto/joke-command.dto";
import { HestiaEmbed } from "../../hestia/classes/hestia-embed.class";

@Injectable()
export class JokeCommandService {
    constructor(private readonly hestiaService: HestiaService) {}
}
