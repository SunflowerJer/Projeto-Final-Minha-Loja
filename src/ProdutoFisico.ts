import { Produto } from "./Produto";

const PESO_MINIMO = 1;

export class ProdutoFisico extends Produto {
    private readonly _pesoEmGramas: number;

    constructor(id: number, nome: string, preco: number, descricao: string, estoque: number, pesoEmGramas: number) {
        super(id, nome, preco, descricao, estoque);
        if (pesoEmGramas < PESO_MINIMO) throw new Error("Peso deve ser positivo.");
        this._pesoEmGramas = pesoEmGramas;
    }

    public get pesoEmGramas(): number {
        return this._pesoEmGramas;
    }

    public override getDescricaoCompleta(): string {
        return `${this.nome} (Físico) - ${this.descricao} | Peso: ${this._pesoEmGramas}g | Preço: R$${this.preco.toFixed(2)}`;
    }

    public toJSON(): object {
        return { ...super.toJSON(), tipo: "fisico", pesoEmGramas: this._pesoEmGramas };
    }
}