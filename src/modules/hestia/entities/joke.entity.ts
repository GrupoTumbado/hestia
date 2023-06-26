import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("jokes")
export class Joke {
    /**
     * The joke's ID
     * @example '1'
     */
    @PrimaryColumn()
    id: number;

    /**
     * The joke
     */
    @Column()
    joke: string;

    /**
     * The category of the joke
     * @example 'Dad Jokes'
     */
    @Column()
    category: string;
}
