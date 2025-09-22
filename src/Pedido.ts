import { Produto } from "./Produto";
import { ClienteBase } from "./ClienteBase";
import { Pagamento } from "./Pagamento";

type ItemPedido = {
    produto: Produto;
    quantidade: number;
};

const PEDIDO_STATUS_PENDENTE = "pendente";
const PEDIDO_STATUS_PAGO = "pago";
const PEDIDO_STATUS_ENVIADO = "enviado";
const PEDIDO_STATUS_ENTREGUE = "entregue";
const ITENS_MINIMO = 1;
const TOTAL_MINIMO = 0;

export class Pedido {
    private readonly _id: number;
    private readonly _cliente: ClienteBase;
    private readonly _itens: ItemPedido[];
    private readonly _total: number;
    private _status: string = PEDIDO_STATUS_PENDENTE;
    private _pagamento: Pagamento | null = null;

    constructor(id: number, cliente: ClienteBase, itens: ItemPedido[], total: number) {
        if (itens.length < ITENS_MINIMO) throw new Error("Pedido deve ter pelo menos um item.");
        if (total < TOTAL_MINIMO) throw new Error("Total não pode ser negativo.");
        this._id = id;
        this._cliente = cliente;
        this._itens = itens;
        this._total = total;
    }

    public get id(): number { return this._id; }
    public get cliente(): ClienteBase { return this._cliente; }
    public get itens(): ItemPedido[] { return this._itens; }
    public get total(): number { return this._total; }
    public get status(): string { return this._status; }
    public get pagamento(): Pagamento | null { return this._pagamento; }

    public pagar(metodo: Pagamento): boolean {
        if (this._status !== PEDIDO_STATUS_PENDENTE) throw new Error("Pedido já pago ou enviado.");
        if (metodo.pagar(this._total)) {
            this._pagamento = metodo;
            this._status = PEDIDO_STATUS_PAGO;
            return true;
        }
        return false;
    }

    public enviar(): void {
        if (this._status === PEDIDO_STATUS_PAGO) {
            this._status = PEDIDO_STATUS_ENVIADO;
        } else {
            throw new Error("Pedido precisa estar pago antes de enviar.");
        }
    }

    public entregar(): void {
        if (this._status === PEDIDO_STATUS_ENVIADO) {
            this._status = PEDIDO_STATUS_ENTREGUE;
        } else {
            throw new Error("Pedido precisa estar enviado antes de entregar.");
        }
    }

    public toJSON(): object {
        return {
            id: this._id,
            cliente: this._cliente.id,
            itens: this._itens.map(i => ({
                produto: i.produto.toJSON(),
                quantidade: i.quantidade
            })),
            total: this._total,
            status: this._status,
            pagamento: this._pagamento ? this._pagamento.constructor.name : null
        };
    }
}