import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("logs")
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guild_id: string;

    @Column()
    discord_user: string;

    @Column()
    action: string;

    @Column({ default: null })
    command: string;

    @Column()
    created_at: number;
}
