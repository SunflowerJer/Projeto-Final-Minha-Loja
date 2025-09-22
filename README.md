# Projeto Final - Minha Loja 🛒

**Projeto Final do Módulo 2 - Programação Orientada a Objetos (POO)** do curso ADA&Cognizant - DiversAbility. 
Este sistema simula o fluxo de uma loja online, permitindo o cadastro de clientes (Pessoa Física e Jurídica), produtos físicos e digitais, aplicação de cupons, gerenciamento de carrinho de compras, geração de pedidos, pagamento e entrega.

---

## ✨ Introdução

O objetivo do projeto é demonstrar conceitos de Programação Orientada a Objetos (POO) em TypeScript, aplicando boas práticas de design e arquitetura de software.  
O sistema está organizado em classes responsáveis por clientes, produtos, cupons, carrinho, pedido e pagamento, possibilitando fácil manutenção, reuso e extensibilidade.
O foco está em regras de negócio, segurança dos dados e estrutura de classes — não em interface visual.

---

## 🚀 Tecnologias Utilizadas

- **TypeScript**
- **Node.js**
- **ts-node**
- [Diagrams.net](https://app.diagrams.net/) (para UML)
- Ferramentas padrão de Git/GitHub
- - Ferramenta de execução: `tsc` (TypeScript Compiler) ou `ts-node`
---

## 🛠️ Como instalar e executar

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/SunflowerJer/Projeto-Final-Minha-Loja.git
   cd Projeto-Final-Minha-Loja
   ```

2. **Instale as dependências (se houver):**
   ```bash
   npm install
   ```

3. **Compile o projeto (se necessário):**
   ```bash
   npx tsc
   ```

4. **Execute o sistema:**
   ```bash
   npx ts-node src/index.ts
   ```
   ou, se já compilado:
   ```bash
   node dist/index.js
   ```

---

## 🧩 Pontos de Decisão e Justificativas

- **Encapsulamento:**  
  Todos os atributos das classes são privados, acessados apenas por getters/setters ou métodos validados, garantindo integridade dos dados.

- **Composição:**  
  O carrinho de compras é composto por itens de produtos. Ao finalizar um pedido, os itens do carrinho são transferidos para o pedido, e o carrinho é esvaziado automaticamente.  
  _Decisão:_ Facilita o controle de fluxo, cálculo de totais e regras de negócio.

- **Associação:**  
  Cada cliente possui múltiplos pedidos associados, permitindo o histórico de compras e cálculo do total gasto.

- **Herança e Polimorfismo:**  
  Utilizei uma classe abstrata `ClienteBase` para definir dados e métodos comuns a todos os clientes.  
  As classes `ClientePessoaFisica` e `ClientePessoaJuridica` estendem essa base, trazendo atributos exclusivos (CPF ou CNPJ).  
  Produtos, cupons e pagamentos usam classes abstratas e filhas especializadas (`ProdutoFisico`, `ProdutoDigital`, `CupomPercentual`, `CupomValorFixo`, `PagamentoPix`, `PagamentoCartaoCredito`), com sobrescrita de métodos para lógica específica.  
  _Decisão:_ Centraliza lógica comum e facilita extensibilidade e manutenção.

- **Serialização:**  
  Todos os objetos principais implementam o método `toJSON`, facilitando exportação, persistência, testes e simulação de integração com APIs.

- **Controle de fluxo seguro:**  
  O carrinho impede adicionar mais itens do que o estoque disponível, e o pedido só pode ser pago e enviado após todas validações necessárias (estoque, pagamento, entrega).

- **Validação:**  
  CPF, CNPJ, estoque e descontos são validados antes de qualquer operação, evitando inconsistências.

---

## 📊 Diagrama UML

O projeto contém um diagrama UML no arquivo `Diagrama-UML-Minha-Loja.png`, mostrando todas as classes, atributos, métodos, relacionamentos e multiplicidades, criado antes da implementação.

---

## 📋 Pontos Extras & Boas Práticas

- **Código limpo e modular:**  
  Cada classe tem responsabilidade única, facilitando manutenção.
- **Validações robustas:**  
  CPF, CNPJ, estoque e descontos são validados antes de qualquer operação.
- **Extensível:**  
  Fácil adicionar novos tipos de produto, cupom ou pagamento.
- **Documentação clara nos métodos principais.**

---

## 🎓 Autor
 
Projeto por **Jeronimo Lucas (@SunflowerJer)**  
Curso ADA Cognizant DiversAbility — Programação Orientada a Objetos  
Professor: Roosevelt Franklin