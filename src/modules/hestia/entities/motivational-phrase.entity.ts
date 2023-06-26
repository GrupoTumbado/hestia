import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("motivational_phrases")
export class MotivationalPhrase {
    /**
     * The phrase's ID
     * @example '1'
     */
    @PrimaryColumn()
    id: number;

    /**
     * The phrase
     */
    @Column()
    phrase: string;

    /**
     * The category of the phrase
     */
    @Column()
    category: string;
}
