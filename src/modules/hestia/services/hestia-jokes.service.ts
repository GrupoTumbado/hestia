import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Joke } from "../entities/joke.entity";

@Injectable()
export class HestiaJokesService {
    constructor(
        @InjectRepository(Joke, "hestia")
        private jokeRepository: Repository<Joke>,
    ) {}

    findAll(): Promise<Joke[]> {
        return this.jokeRepository.find();
    }

    findOneRandom(): Promise<Joke> {
        return this.jokeRepository.createQueryBuilder().orderBy("RANDOM()").limit(1).getOne();
    }

    findOneRandomByCategory(category: string): Promise<Joke> {
        return this.jokeRepository.createQueryBuilder().where({ category }).orderBy("RANDOM()").limit(1).getOne();
    }
}
