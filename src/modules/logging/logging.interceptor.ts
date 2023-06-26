import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Log } from "./entities/log.entity";
import { Observable, tap } from "rxjs";
import {
    ApplicationCommandOptionType,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember,
    UserContextMenuCommandInteraction,
} from "discord.js";
import { ContextOf } from "necord";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @InjectRepository(Log, "hestia")
        private logsRepository: Repository<Log>,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            tap(async () => {
                const [interaction] =
                    context.getArgByIndex<[CommandInteraction<"cached"> | UserContextMenuCommandInteraction<"cached">]>(0);
                const [member] = context.getArgByIndex<ContextOf<"guildMemberAdd">>(0);

                if (
                    !(interaction instanceof UserContextMenuCommandInteraction || interaction instanceof CommandInteraction) &&
                    !(member instanceof GuildMember)
                )
                    return;
                const guildId = member.guild.id || interaction.guild.id;
                const log = new Log();
                log.guild_id = guildId;

                if (member instanceof GuildMember) {
                    log.discord_user = member.user.id;
                    log.action = "guildMemberAdd";
                } else if (interaction instanceof CommandInteraction) {
                    log.discord_user = interaction.user.id;
                    log.action = "command";
                    if (interaction.isContextMenuCommand()) {
                        log.action = "contextMenuCommand";
                    }

                    let commandName = interaction.command.name;
                    let options = interaction.options;
                    if (options instanceof CommandInteractionOptionResolver) {
                        options.data.forEach((option, index) => {
                            if (
                                option.type === ApplicationCommandOptionType.Subcommand ||
                                option.type === ApplicationCommandOptionType.SubcommandGroup
                            ) {
                                commandName += " " + option.name;
                                option.options.forEach((subOption, index) => {
                                    commandName += " " + subOption.name + ":" + subOption.value;
                                });
                            } else {
                                commandName += " " + option.name + ":" + option.value;
                            }
                        });
                    }

                    log.command = commandName;
                } else {
                    return;
                }

                await this.logToDb(log);
                return;
            }),
        );
    }

    async logToDb(log: Log): Promise<void> {
        await this.logsRepository.save(log);
    }
}
