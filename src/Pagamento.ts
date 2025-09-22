// Pagamento para polimorf
export abstract class Pagamento {
    abstract pagar(valor: number): boolean;
}

export class PagamentoCartaoCredito extends Pagamento {
    pagar(valor: number): boolean {
        if (valor <= 0) throw new Error("Valor inválido.");
        console.log("Pagamento com cartão aprovado!");
        return true;
    }
}

export class PagamentoPix extends Pagamento {
    pagar(valor: number): boolean {
        if (valor <= 0) throw new Error("Valor inválido.");
        console.log("Pagamento via Pix aprovado!");
        return true;
    }
}