# Design system (cópia local)

Esta pasta é uma cópia do design system "Davi Soares" (Claude Design). Não edite aqui: mude no design system e sincronize.

| Arquivo | Origem no design system |
|---|---|
| `tokens.css` | gerado de `tokens.json` (fontes apontando para `/fonts/`) |
| `components.css` | `components/bundle.css` |
| `components/*.tsx`, `components/*.ts` | `components/src/` (sem o `index.ts`) |
| `public/fonts/*.woff2` | `fonts/` |

A única diferença é o `components/react.ts`: no design system o React vem de `window.React`; aqui vem do npm.

Componentes e estilos próprios do site ficam fora desta pasta, em `src/components/` e `src/styles/`.
