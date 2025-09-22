export abstract class ClienteBase {
    private readonly _id: number;
    private _email!: string;

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

    public toJSON() {
        return {
            id: this.id,
            email: this.email
        }
    }
}