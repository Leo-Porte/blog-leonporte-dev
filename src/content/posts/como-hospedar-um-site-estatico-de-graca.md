---
title: "Como hospedar um site estático de graça com Cloudflare Pages"
description: "Passo a passo para fazer deploy automático de um site estático usando Cloudflare Pages, com CDN global e sem custo."
pubDate: 2026-03-10
tags: ["cloudflare", "deploy", "infraestrutura"]
---

Uma das decisões mais importantes ao criar um projeto pessoal é onde hospedá-lo. A boa notícia: em 2026, você pode hospedar um site estático com **CDN global, HTTPS automático e deploy contínuo — tudo de graça**.

## As opções gratuitas

As três grandes opções para hosting de sites estáticos são:

| Plataforma | Banda gratuita | Build minutes |
|---|---|---|
| Vercel | 100 GB/mês | 6.000/mês |
| Netlify | 100 GB/mês | 300/mês |
| Cloudflare Pages | **Ilimitada** | 500/mês |

## Por que Cloudflare Pages?

O diferencial é claro: **banda ilimitada no plano gratuito**. Se um post viralizar e receber 100k visitas em um dia, você não paga nada a mais. Nos concorrentes, isso poderia estourar a cota.

Além disso, a Cloudflare opera a **maior rede de CDN do mundo** — mais de 300 data centers. Seu conteúdo é servido do ponto mais próximo do visitante.

## Como configurar

### 1. Conectar o repositório

Acesse [dash.cloudflare.com](https://dash.cloudflare.com), vá em **Workers & Pages** e clique em **Create application**. Conecte sua conta do GitHub e selecione o repositório.

### 2. Configurar o build

Para um projeto Astro, as configurações são:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** 22 (definir via variável de ambiente `NODE_VERSION`)

### 3. Deploy automático

Pronto. A cada `git push` na branch `main`, o Cloudflare Pages vai:

1. Detectar o push automaticamente
2. Executar `npm run build`
3. Publicar os arquivos estáticos na CDN global

Não há nenhuma etapa manual.

## Domínio personalizado

O Cloudflare Pages gera um subdomínio gratuito (`seu-projeto.pages.dev`), mas você pode conectar um domínio próprio. Se o DNS já estiver no Cloudflare, a configuração é instantânea.

## Conclusão

Para projetos estáticos, Cloudflare Pages é a melhor opção custo-benefício. Zero custo, banda ilimitada, e um pipeline de deploy que funciona com um simples `git push`.
