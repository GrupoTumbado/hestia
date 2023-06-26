import { Catch, ArgumentsHost } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class InteractionExceptionFilter extends BaseExceptionFilter {
    async catch(exception: unknown, host: ArgumentsHost) {
        if (host.getType<string>() !== "necord" || host.getType<string>() !== "discord.js") {
            console.error(exception);
            return true;
        }

        console.error(exception);
        // TODO: Implement error logging
        return true;
    }
}
