import { Pedido } from "./Pedido";
export abstract class ClienteBase {
    private readonly _id: number;
    private _email!: string;
    private _pedidos: Pedido[] = [];

    constructor(id: number, email: string) {
        this._id = id;
        this.email = email;
    }

    public get id(): number {
        return this._id;
    }

    public get email(): string {
        return this._email;
    }

    public set email(novoEmail: string) {
        if (novoEmail.includes('@')) {
            this._email = novoEmail;
        } else {
            throw new Error("E-mail inválido!");
        }
    }

    public aplicarAtualizacoes(dados: Partial<{ email: string }>): void {
        if (dados.email) {
            this.email = dados.email;
        }
    }

    public adicionarPedido(pedido: Pedido) {
        this._pedidos.push(pedido);
    }

    public calcularTotalGasto() {
        return this._pedidos.reduce((total, pedido) => total + pedido.total, 0);
    }

    public toJSON() {
        return {
            id: this.id,
            email: this.email,
            pedidos: this._pedidos.map(p => p.toJSON())
        }
    }
}