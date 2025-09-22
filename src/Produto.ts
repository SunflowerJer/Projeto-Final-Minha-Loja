const NOME_MINIMO = 2;
const PRECO_MINIMO = 0;
const ESTOQUE_MINIMO = 0;

export abstract class Produto {
    private readonly _id: number;
    private _nome: string;
    private _preco: number;
    private _descricao: string;
    private _estoque: number;

    constructor(id: number, nome: string, preco: number, descricao: string, estoque: number) {
        if (!nome || nome.length < NOME_MINIMO) throw new Error("Nome do produto inválido.");
        if (preco < PRECO_MINIMO) throw new Error("Preço não pode ser negativo.");
        if (estoque < ESTOQUE_MINIMO) throw new Error("Estoque não pode ser negativo.");
        this._id = id;
        this._nome = nome;
        this._preco = preco;
        this._descricao = descricao;
        this._estoque = estoque;
    }

    public get id(): number { return this._id; }
    public get nome(): string { return this._nome; }
    public get preco(): number { return this._preco; }
    public get descricao(): string { return this._descricao; }
    public get estoque(): number { return this._estoque; }

    public set preco(valor: number) {
        if (valor < PRECO_MINIMO) throw new Error("Preço não pode ser negativo.");
        this._preco = valor;
    }

    public set estoque(valor: number) {
        if (valor < ESTOQUE_MINIMO) throw new Error("Estoque não pode ser negativo.");
        this._estoque = valor;
    }

    public baixarEstoque(quantidade: number): boolean {
        if (quantidade <= 0) throw new Error("Quantidade inválida.");
        if (this._estoque < quantidade) return false;
        this._estoque -= quantidade;
        return true;
    }

    public abstract getDescricaoCompleta(): string;

    public toJSON(): object {
        return {
            id: this._id,
            nome: this._nome,
            preco: this._preco,
            descricao: this._descricao,
            estoque: this._estoque
        };
    }
}