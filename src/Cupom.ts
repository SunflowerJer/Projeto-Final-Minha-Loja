export abstract class Cupom {
    protected readonly _codigo: string;
    constructor(codigo: string) {
        if (!codigo || codigo.length < 3) throw new Error("Código de cupom inválido.");
        this._codigo = codigo;
    }
    public get codigo(): string { return this._codigo; }
    public abstract aplicarDesconto(valor: number): number;
}

export class CupomPercentual extends Cupom {
    private readonly _percentual: number;
    private static readonly PERCENTUAL_MIN = 1;
    private static readonly PERCENTUAL_MAX = 100;
    constructor(codigo: string, percentual: number) {
        super(codigo);
        if (percentual < CupomPercentual.PERCENTUAL_MIN || percentual > CupomPercentual.PERCENTUAL_MAX)
            throw new Error("Percentual inválido.");
        this._percentual = percentual;
    }
    public aplicarDesconto(valor: number): number {
        return valor - (valor * this._percentual / 100);
    }
}

export class CupomValorFixo extends Cupom {
    private readonly _valorFixo: number;
    private static readonly VALOR_FIXO_MIN = 1;
    constructor(codigo: string, valorFixo: number) {
        super(codigo);
        if (valorFixo < CupomValorFixo.VALOR_FIXO_MIN) throw new Error("Valor fixo inválido.");
        this._valorFixo = valorFixo;
    }
    public aplicarDesconto(valor: number): number {
        return Math.max(0, valor - this._valorFixo);
    }
}