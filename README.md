# blog-leonporte-dev

Blog pessoal sobre tecnologia, arquitetura de sistemas e desenvolvimento de software. Construído com Astro (SSG), Tailwind CSS e hospedado no Cloudflare Pages — custo operacional zero.

## Stack

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | Astro (SSG) | HTML puro no build, zero JS no cliente, suporte nativo a Markdown |
| Hosting | Cloudflare Pages | CDN global gratuita, deploy automático via Git, banda ilimitada |
| Conteúdo | Markdown + Content Collections | Posts versionados no Git com schema validado via Zod |
| Estilo | Tailwind CSS | Utilitário, sem CSS morto em produção |
| Transições | View Transitions API | Navegação suave entre páginas sem SPA |

## Estrutura do Projeto

```
src/
├── content.config.ts          # Schema da Content Collection (Zod)
├── content/posts/             # Posts em Markdown
├── components/                # Head, Header, Footer, PostCard
├── layouts/                   # BaseLayout, PostLayout
├── pages/                     # index, posts/[...slug], 404, rss.xml
└── styles/global.css          # Tailwind + prose styles + animações
```

## Comandos

```bash
# Instalar dependências
npm install

# Rodar localmente (localhost:4321)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

## Como publicar um novo post

Crie um arquivo `.md` em `src/content/posts/` com o frontmatter:

```markdown
---
title: "Título do post"
description: "Descrição curta para SEO e listagem"
pubDate: 2026-03-11
tags: ["tag1", "tag2"]
draft: false
---

Conteúdo do post em Markdown...
```

Faça `git push` e o Cloudflare Pages cuida do resto.

## Deploy

O deploy é automático via Cloudflare Pages:

1. Push na branch `main`
2. Cloudflare detecta o push
3. Executa `npm run build`
4. Publica os arquivos estáticos na CDN global

**Configuração no Cloudflare Pages:**
- Build command: `npm run build`
- Build output directory: `dist`
- Variável de ambiente: `NODE_VERSION` = `22`

## Funcionalidades

- Página inicial com lista de posts recentes
- Página individual de post com layout de leitura
- Content Collections com validação de frontmatter via Zod
- Meta tags SEO (title, description, Open Graph, Twitter)
- View Transitions para navegação suave entre páginas
- Animações de entrada (fade-up, stagger nos cards)
- Feed RSS (`/rss.xml`)
- Sitemap automático (`/sitemap-index.xml`)
- Design responsivo
- Página 404 personalizada
