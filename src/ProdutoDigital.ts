import { Produto } from "./Produto";

const URL_PREFIXO = "http"; // prefixo padrão para url válida

export class ProdutoDigital extends Produto {
    private readonly _urlDownload: string;

    constructor(id: number, nome: string, preco: number, descricao: string, estoque: number, urlDownload: string) {
        super(id, nome, preco, descricao, estoque);
        if (!urlDownload.startsWith(URL_PREFIXO)) throw new Error("URL de download inválida.");
        this._urlDownload = urlDownload;
    }

    public get urlDownload(): string {
        return this._urlDownload;
    }

    public override getDescricaoCompleta(): string {
        return `${this.nome} (Digital) - ${this.descricao} | Link: ${this._urlDownload} | Preço: R$${this.preco.toFixed(2)}`;
    }

    public toJSON(): object {
        return { ...super.toJSON(), tipo: "digital", urlDownload: this._urlDownload };
    }
}