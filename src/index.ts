import { ClientePessoaFisica } from "./ClientePessoaFisica";
import { ClientePessoaJuridica } from "./ClientePessoaJuridica";
import { ProdutoFisico } from "./ProdutoFisico";
import { ProdutoDigital } from "./ProdutoDigital";
import { CupomPercentual, CupomValorFixo } from "./Cupom";
import { PagamentoCartaoCredito, PagamentoPix } from "./Pagamento";
import { Carrinho } from "./Carrinho";

console.log('--- Bem-vindo à Minha Loja! ---');

// Criando clientes PF e PJ
const clientePF = new ClientePessoaFisica(1, "joao@email.com", "João da Silva", "123.456.789-09");
const clientePJ = new ClientePessoaJuridica(2, "contato@empresa.com.br", "Empresa XPTO", "12.345.678/0001-99");

// Criando produtos
const produto1 = new ProdutoFisico(101, "Notebook", 3500, "Notebook Dell", 10, 2500);
const produto2 = new ProdutoFisico(102, "Mouse Gamer", 200, "Mouse RGB", 5, 200);
const produto3 = new ProdutoDigital(103, "E-book", 50, "Livro Digital", 100, "http://download.com/ebook");

console.log("\n--- Produtos cadastrados ---");
console.log(produto1.getDescricaoCompleta());
console.log(produto2.getDescricaoCompleta());
console.log(produto3.getDescricaoCompleta());

// Carrinho do PF
const carrinhoPF = new Carrinho(clientePF);
carrinhoPF.adicionarProduto(produto1, 1);
carrinhoPF.adicionarProduto(produto2, 2);
carrinhoPF.adicionarProduto(produto3, 1);

console.log("\n--- Carrinho do PF ---");
console.log(carrinhoPF.toJSON());

// Aplicando cupom percentual
const cupomPercentual = new CupomPercentual("DESC10", 10);
carrinhoPF.aplicarCupom(cupomPercentual);

console.log("\n--- Carrinho do PF com cupom ---");
console.log(carrinhoPF.toJSON());

// Removendo produto do carrinho
carrinhoPF.removerProduto(produto2.id);

console.log("\n--- Carrinho do PF após remover produto ---");
console.log(carrinhoPF.toJSON());

// Finalizando compra PF
const pedidoPF = carrinhoPF.finalizarPedido();
clientePF.adicionarPedido(pedidoPF);

console.log("\n--- Pedido PF ---");
console.log(pedidoPF.toJSON());

// Pagando pedido PF
pedidoPF.pagar(new PagamentoPix());
pedidoPF.enviar();
pedidoPF.entregar();

console.log("\n--- Pedido PF após pagamento e envio ---");
console.log(pedidoPF.toJSON());

// Carrinho do PJ
const carrinhoPJ = new Carrinho(clientePJ);
carrinhoPJ.adicionarProduto(produto1, 1);

console.log("\n--- Carrinho do PJ ---");
console.log(carrinhoPJ.toJSON());

// Aplicando cupom valor fixo
const cupomFixo = new CupomValorFixo("FIXO50", 50);
carrinhoPJ.aplicarCupom(cupomFixo);

console.log("\n--- Carrinho do PJ com cupom ---");
console.log(carrinhoPJ.toJSON());

// Finalizando compra PJ
const pedidoPJ = carrinhoPJ.finalizarPedido();
clientePJ.adicionarPedido(pedidoPJ);

console.log("\n--- Pedido PJ ---");
console.log(pedidoPJ.toJSON());

// Pagando pedido PJ
pedidoPJ.pagar(new PagamentoCartaoCredito());
pedidoPJ.enviar();
pedidoPJ.entregar();

console.log("\n--- Pedido PJ após pagamento e envio ---");
console.log(pedidoPJ.toJSON());

console.log("\n--- Total gasto por cada cliente ---");
console.log(`${clientePF.nome}: R$ ${clientePF.calcularTotalGasto().toFixed(2)}`);
console.log(`${clientePJ.razaoSocial}: R$ ${clientePJ.calcularTotalGasto().toFixed(2)}`);