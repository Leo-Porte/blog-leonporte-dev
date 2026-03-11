---
title: "Por que escolhi Astro para o meu blog"
description: "Uma análise prática sobre por que Astro é a melhor escolha para blogs de conteúdo estático em 2026, comparando com Next.js e Nuxt."
pubDate: 2026-03-11
tags: ["astro", "web", "arquitetura"]
---

Quando decidi criar um blog pessoal para documentar meus aprendizados, a primeira pergunta foi: **qual framework usar?**

## Os candidatos

Considerei três opções:

- **Next.js** — o gigante do ecossistema React
- **Nuxt** — o equivalente no mundo Vue
- **Astro** — o framework focado em conteúdo

## Por que não Next.js ou Nuxt?

Next e Nuxt são frameworks **orientados a aplicações**. Eles brilham quando você precisa de:

- Autenticação
- Dados em tempo real
- Interatividade complexa no cliente

Para um blog onde **100% do conteúdo é estático**, o overhead de hidratação de React ou Vue é desnecessário. Cada kilobyte de JavaScript que vai pro cliente é um kilobyte a mais que o Google precisa processar — e que prejudica seus Core Web Vitals.

## O que o Astro faz diferente

O Astro adota uma abordagem chamada **"Zero JS by default"**. Ele gera HTML puro no build. Se um componente não precisa de interatividade, ele não envia JavaScript para o navegador.

```astro
---
// Isso roda no build, não no navegador
const posts = await getCollection('posts');
---

<ul>
  {posts.map(post => <li>{post.data.title}</li>)}
</ul>
```

O resultado é um site que:

- Carrega instantaneamente na CDN
- Tem score 100 no Lighthouse sem esforço
- Não depende de runtime no cliente

## Content Collections

Outro diferencial é o sistema de **Content Collections**. Você define um schema com Zod e o Astro valida todo o frontmatter dos seus Markdown no build:

```typescript
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

Se um post tem um campo faltando ou com tipo errado, o build falha com uma mensagem clara. Type-safety para conteúdo.

## Conclusão

Para um blog de conteúdo, Astro é a ferramenta certa para o trabalho. Sem overhead, sem complexidade desnecessária, sem custo de servidor.

> Use a ferramenta certa para o problema certo. Nem sempre o framework mais popular é o mais adequado.
