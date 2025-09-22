import { Produto } from "./Produto";

const QUANTIDADE_MINIMA = 1;

export class ItemCarrinho {
    private readonly _produto: Produto;
    private _quantidade: number;

    constructor(produto: Produto, quantidade: number) {
        if (quantidade < QUANTIDADE_MINIMA) throw new Error("Quantidade deve ser positiva.");
        this._produto = produto;
        this._quantidade = quantidade;
    }

    public get produto(): Produto { return this._produto; }
    public get quantidade(): number { return this._quantidade; }
    public set quantidade(qtd: number) {
        if (qtd < QUANTIDADE_MINIMA) throw new Error("Quantidade deve ser positiva.");
        this._quantidade = qtd;
    }

    public get valorTotal(): number {
        return this._produto.preco * this._quantidade;
    }

    public toJSON(): object {
        return {
            produto: this._produto.toJSON(),
            quantidade: this._quantidade,
            valorTotal: this.valorTotal
        };
    }
}