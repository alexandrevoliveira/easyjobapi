import { ICreateCandidateDTO } from "@modules/candidates/dtos/ICreateCandidateDTO";
import { ICandidatesRepository } from "@modules/candidates/repositories/ICandidatesRepository";
import { getRepository, Repository } from "typeorm";

import { Candidate } from "../entities/Candidate";

class CandidatesRepository implements ICandidatesRepository {
  private repository: Repository<Candidate>;

  constructor() {
    this.repository = getRepository(Candidate);
  }

  async create({
    name,
    email,
    password,
    cpf,
  }: ICreateCandidateDTO): Promise<void> {
    const candidate = this.repository.create({ name, email, password, cpf });

    await this.repository.save(candidate);
  }

  async findByEmail(email: string): Promise<Candidate> {
    const candidate = await this.repository.findOne({ email });
    return candidate;
  }

  async findByEmailOrCpf(email: string, cpf: string): Promise<Candidate> {
    const candidate = await this.repository.findOne({
      where: [{ email }, { cpf }],
    });
    return candidate;
  }

  async list(): Promise<Candidate[]> {
    const candidates = this.repository.find();
    return candidates;
  }
}

export { CandidatesRepository };
