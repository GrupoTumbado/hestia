import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("guilds")
export class GuildData {
    @PrimaryColumn()
    id: string;

    @Column()
    guild_name: string;

    @Column()
    guild_owner: string;

    @Column()
    members: number;

    @Column()
    created_at: string;

    @Column()
    last_updated: string;
}
