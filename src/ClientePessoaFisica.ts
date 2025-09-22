import { ClienteBase } from "./ClienteBase";

const TAMANHO_MIN_NOME = 2; // Mínimo para nome válido
const TAMANHO_MIN_CPF = 11; // Mínimo para CPF válido

export class ClientePessoaFisica extends ClienteBase {
    private _nome!: string;
    private _cpf!: string;

    constructor(id: number, email: string, nome: string, cpf: string) {
        super(id, email);
        this.nome = nome;
        this.cpf = cpf;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(novoNome: string) {
        if (!novoNome || novoNome.trim().length < TAMANHO_MIN_NOME) throw new Error("Nome inválido.");
        this._nome = novoNome;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public set cpf(novoCpf: string) {
        if (!novoCpf || novoCpf.length < TAMANHO_MIN_CPF) throw new Error("CPF inválido.");
        this._cpf = novoCpf;
    }

    public aplicarAtualizacoes(dados: Partial<{ email: string, nome: string, cpf: string }>) {
        super.aplicarAtualizacoes(dados);
        if (dados.nome) this.nome = dados.nome;
        if (dados.cpf) this.cpf = dados.cpf;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            nome: this._nome,
            cpf: this._cpf
        }
    }
}