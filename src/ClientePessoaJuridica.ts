import { ClienteBase } from "./ClienteBase";

const TAMANHO_MIN_RAZAO = 2; // Mínimo para razão social válida
const TAMANHO_MIN_CNPJ = 14; // Mínimo para CNPJ válido

export class ClientePessoaJuridica extends ClienteBase {
    private _razaoSocial!: string;
    private _cnpj!: string;

    constructor(id: number, email: string, razaoSocial: string, cnpj: string) {
        super(id, email);
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
    }

    public get razaoSocial(): string {
        return this._razaoSocial;
    }

    public set razaoSocial(novaRazao: string) {
        if (!novaRazao || novaRazao.trim().length < TAMANHO_MIN_RAZAO) throw new Error("Razão Social inválida.");
        this._razaoSocial = novaRazao;
    }

    public get cnpj(): string {
        return this._cnpj;
    }

    public set cnpj(novoCnpj: string) {
        if (!novoCnpj || novoCnpj.length < TAMANHO_MIN_CNPJ) throw new Error("CNPJ inválido.");
        this._cnpj = novoCnpj;
    }

    public aplicarAtualizacoes(dados: Partial<{ email: string, razaoSocial: string, cnpj: string }>) {
        super.aplicarAtualizacoes(dados);
        if (dados.razaoSocial) this.razaoSocial = dados.razaoSocial;
        if (dados.cnpj) this.cnpj = dados.cnpj;
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            razaoSocial: this._razaoSocial,
            cnpj: this._cnpj
        }
    }
}