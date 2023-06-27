import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MotivationalPhrase } from "../entities/motivational-phrase.entity";

@Injectable()
export class HestiaMotivationalPhrasesService {
    constructor(
        @InjectRepository(MotivationalPhrase, "hestia")
        private motivationalPhraseRepository: Repository<MotivationalPhrase>,
    ) {}

    findAll(): Promise<MotivationalPhrase[]> {
        return this.motivationalPhraseRepository.find();
    }

    findOneRandom(): Promise<MotivationalPhrase> {
        return this.motivationalPhraseRepository.createQueryBuilder().orderBy("RAND()").limit(1).getOne();
    }

    findOneRandomByCategory(category: string): Promise<MotivationalPhrase> {
        return this.motivationalPhraseRepository.createQueryBuilder().where({ category }).orderBy("RAND()").limit(1).getOne();
    }
}
