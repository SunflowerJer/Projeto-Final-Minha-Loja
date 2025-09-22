import { ItemCarrinho } from "./ItemCarrinho";
import { Produto } from "./Produto";
import { Cupom } from "./Cupom";
import { ClienteBase } from "./ClienteBase";
import { Pedido } from "./Pedido";

export class Carrinho {
    private readonly _cliente: ClienteBase;
    private _itens: ItemCarrinho[] = [];
    private _cupom: Cupom | null = null;

    constructor(cliente: ClienteBase) {
        this._cliente = cliente;
    }

    public get cliente(): ClienteBase { return this._cliente; }
    public get itens(): ItemCarrinho[] { return this._itens; }
    public get cupom(): Cupom | null { return this._cupom; }

    public adicionarProduto(produto: Produto, quantidade: number): boolean {
        if (quantidade <= 0) throw new Error("Quantidade deve ser positiva.");
        if (produto.estoque < quantidade) throw new Error("Estoque insuficiente.");
        const existente = this._itens.find(item => item.produto.id === produto.id);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this._itens.push(new ItemCarrinho(produto, quantidade));
        }
        return true;
    }

    public removerProduto(produtoId: number): boolean {
        const idx = this._itens.findIndex(item => item.produto.id === produtoId);
        if (idx >= 0) {
            this._itens.splice(idx, 1);
            return true;
        }
        throw new Error("Produto não encontrado no carrinho.");
    }

    public calcularTotal(): number {
        let total = this._itens.reduce((acc, item) => acc + item.valorTotal, 0);
        if (this._cupom) {
            total = this._cupom.aplicarDesconto(total);
        }
        return total;
    }

    public aplicarCupom(cupom: Cupom): void {
        this._cupom = cupom;
    }

    public limparCarrinho(): void {
        this._itens = [];
        this._cupom = null;
    }

    public finalizarPedido(): Pedido {
        if (this._itens.length === 0) throw new Error("Carrinho vazio.");
        for (const item of this._itens) {
            if (!item.produto.baixarEstoque(item.quantidade)) {
                throw new Error(`Estoque insuficiente para o produto ${item.produto.nome}`);
            }
        }
        const pedido = new Pedido(
            Date.now(),
            this._cliente,
            this._itens.map(i => ({ produto: i.produto, quantidade: i.quantidade })),
            this.calcularTotal()
        );
        this.limparCarrinho();
        return pedido;
    }

    public toJSON(): object {
        return {
            cliente: this._cliente.id,
            itens: this._itens.map(i => i.toJSON()),
            cupom: this._cupom ? this._cupom.codigo : null,
            total: this.calcularTotal()
        };
    }
}