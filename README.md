# Voltis — Sistema de Projetos Elétricos Residenciais

Sistema web para projetistas elétricos residenciais, baseado na planilha de
dimensionamento (NBR 5410). Permite cadastrar ambientes, vincular equipamentos
(TUEs), gerar circuitos automaticamente e **balancear as fases R/S/T com um clique**.

## O que o sistema faz

- **Previsão de carga por ambiente** (NBR 5410, item 9.5): calcula a potência de
  iluminação e o número/potência de tomadas de uso geral (TUG) a partir da área e
  do perímetro de cada cômodo, conforme o tipo de ambiente (social/quarto,
  serviço/cozinha, banheiro, varanda). O número de pontos de luz é editável manualmente.
- **Banco de equipamentos (TUEs) amplo**: chuveiros, ar-condicionado, forno, cooktop,
  micro-ondas, máquina de lavar, lava e seca, secadora, lava-louças, freezer, bombas,
  motor de portão, carregador de veículo elétrico etc. — organizados por categoria,
  além de equipamentos personalizados cadastráveis na hora.
- **Geração automática de circuitos** a partir da previsão de carga de todos os
  ambientes do projeto — com a opção de **agrupar manualmente** vários circuitos
  selecionados em um só disjuntor (proximidade de cômodos), ou **duplicar/dividir**
  um circuito em dois.
- **Memorial de cálculo**: para cada circuito, calcula corrente de projeto (Ib),
  seção do cabo (mm²) por ampacidade e queda de tensão, disjuntor adequado, e a
  quantidade de pontos de tomada/iluminação atendidos — usando as tabelas de
  referência da NBR 5410.
- **Balanceamento automático de fases**: um botão redistribui os circuitos entre
  as fases R, S e T (algoritmo guloso/LPT) para minimizar o desbalanceamento de
  carga do quadro trifásico. Circuitos podem ser "travados" numa fase específica
  (ícone de cadeado) para não serem movidos pelo algoritmo.
- **Importação de planilha**: sobe um .xlsx/.xls/.csv com os ambientes (nome, tipo,
  área, perímetro) e o sistema cria todos de uma vez.
- **Orçamento estimado de materiais**: quantitativo de cabo (por bitola), disjuntores,
  DPS, eletroduto/conectores e quadro de distribuição, com tabela de preços de
  referência totalmente editável (calibre você mesmo com os valores da sua loja —
  Leroy Merlin, Ferreira Costa etc. — os valores ficam salvos no projeto).
- **Módulo industrial / extra — correção de fator de potência**: cadastre motores
  monofásicos ou trifásicos (potência, FP atual e desejado) e o sistema calcula a
  potência reativa necessária (kVAr) e sugere um banco de capacitores padrão de
  mercado, com preço estimado.
- **Exportação**: memorial completo em **Excel** (.xlsx, com abas de ambientes,
  circuitos, balanço de fases, orçamento e motores) ou em **PDF** (relatório
  formatado, pronto para imprimir/salvar).
- **Multiusuário com login**: cada projetista tem sua conta e seus projetos,
  isolados por Row Level Security no banco de dados.

O motor de cálculo (`src/lib/nbr5410.ts`) foi validado linha a linha contra os
valores da planilha original (`Engine_Projeto_Eletrico_Corrigido.xlsx`).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [Supabase](https://supabase.com) (Postgres + Auth + Row Level Security)
- `lucide-react` para ícones

## Como rodar localmente

### 1. Criar o projeto no Supabase

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e crie um novo projeto.
2. Vá em **SQL Editor** → **New query**, cole o conteúdo de [`supabase/schema.sql`](./supabase/schema.sql) e execute (cria as tabelas, índices e as políticas de RLS).
3. **Se você já tinha rodado uma versão anterior do `schema.sql`**, rode também o [`supabase/migration_002.sql`](./supabase/migration_002.sql) e o [`supabase/migration_003.sql`](./supabase/migration_003.sql) — eles adicionam os campos novos (pontos por circuito, orçamento, motores, dados de ART/RRT e tipo de entrada) sem apagar nada do que já existe.
4. Vá em **Project Settings → API Keys** e copie:
   - `Project URL`
   - `anon public` key

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz (use `.env.local.example` como base):

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 3. Instalar dependências e rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). Crie uma conta na tela de login (o Supabase, por padrão, envia um e-mail de confirmação — você pode desativar isso em **Authentication → Providers → Email → Confirm email** durante o desenvolvimento).

## Configurar a assinatura mensal (Stripe)

O sistema cobra **R$ 19,90/mês** por usuário, sem período de teste, via Stripe.
Quem não tiver assinatura ativa é redirecionado para a tela `/assinar` ao tentar
entrar no painel.

### 1. Criar o produto no Stripe

1. Crie uma conta em [dashboard.stripe.com](https://dashboard.stripe.com) (comece em modo **Test**, depois ative o modo **Live** quando for cobrar de verdade).
2. Vá em **Product catalog → Add product**. Nome: "Voltis — Assinatura mensal".
3. Em **Pricing**, defina **Recurring**, valor **R$ 19,90**, intervalo **Monthly**.
4. Salve e copie o **Price ID** (começa com `price_...`) — vai no `STRIPE_PRICE_ID`.

### 2. Pegar as chaves de API

Em **Developers → API keys**:
- **Secret key** (`sk_test_...` ou `sk_live_...`) → `STRIPE_SECRET_KEY`

### 3. Configurar o webhook

O webhook é o que avisa o seu sistema quando alguém paga, cancela ou tem o
cartão recusado — sem ele, a assinatura nunca fica "ativa" no banco.

**Em produção (depois do deploy na Vercel):**
1. Em **Developers → Webhooks → Add endpoint**.
2. URL: `https://SEU-DOMINIO.vercel.app/api/stripe/webhook`
3. Eventos para escutar: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
4. Copie o **Signing secret** (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`.

**Para testar localmente** (antes do deploy), use a [Stripe CLI](https://docs.stripe.com/stripe-cli):
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Ela imprime um `whsec_...` temporário — use esse no `.env.local` enquanto testa local.

### 4. Pegar a service role key do Supabase

Em **Project Settings → API Keys → Secret keys** do Supabase, copie a chave
secreta (não é a publishable) → `SUPABASE_SERVICE_ROLE_KEY`. Ela é usada **só**
no webhook, no servidor, pra atualizar o status da assinatura ignorando o RLS.

### 5. Rodar a migração do banco

No SQL Editor do Supabase, rode [`supabase/migration_004.sql`](./supabase/migration_004.sql).

### 6. Preencher o `.env.local` (e as variáveis na Vercel)

```
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_ID=...
```

Lembre de adicionar essas mesmas variáveis nas **Environment Variables** do
projeto na Vercel (Settings → Environment Variables) antes do deploy — e usar
as chaves `sk_live_...`/`whsec_...` de produção lá (não as de teste).

> 💡 **Pra testar sem pagar de verdade**: no modo Test do Stripe, use o cartão
> `4242 4242 4242 4242`, qualquer data futura e qualquer CVC — ele simula um
> pagamento aprovado sem cobrar nada. Outra opção: no Supabase, vá em **Table
> editor → profiles**, ache sua linha e mude `subscription_status` para
> `active` manualmente, só pra liberar seu próprio acesso sem passar pelo Stripe.

## Deploy

O caminho mais simples é a [Vercel](https://vercel.com):

1. Suba este repositório para o GitHub (veja abaixo).
2. Em vercel.com, clique em **New Project** e importe o repositório.
3. Adicione as mesmas variáveis de ambiente (`NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`) nas configurações do projeto na Vercel.
4. Deploy.

## Subindo para o GitHub

```bash
cd voltis
git init
git add .
git commit -m "Sistema de projetos elétricos residenciais"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

(Crie antes um repositório vazio em github.com/new — sem README, sem .gitignore — e cole a URL no comando `git remote add origin`.)

## Estrutura do projeto

```
src/
  app/
    page.tsx                      # landing page
    login/page.tsx                # login / cadastro
    dashboard/
      layout.tsx                  # topbar autenticada
      page.tsx                    # lista/criação de projetos
      projects/[id]/
        page.tsx                  # workspace do projeto (abas)
        ambientes-tab.tsx         # cadastro de ambientes + TUEs
        circuitos-tab.tsx         # memorial de circuitos + balanceamento
        balanco-card.tsx          # card visual do balanço de fases
  lib/
    nbr5410.ts                    # motor de cálculo (NBR 5410)
    types.ts                      # tipos das tabelas do banco
    supabase/
      client.ts                   # cliente Supabase (browser)
      server.ts                   # cliente Supabase (server components)
supabase/
  schema.sql                      # schema do banco + RLS
```

## Próximos passos sugeridos

- Exportar o memorial de circuitos para PDF/Excel.
- Editar comprimento/queda de tensão por trecho (em vez de um único "comprimento").
- Suporte a quadros trifásicos com mais de um disjuntor geral (subquadros).
- Histórico de versões do projeto.
