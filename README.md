# Academia Panobianco Jardim Satélite - Website

Este é o website comercial da Academia Panobianco Jardim Satélite, desenvolvido com Next.js 14 e Tailwind CSS, seguindo um design system escuro e moderno.

## 🚀 Sobre o Projeto

Site comercial para a Academia Panobianco localizada no Jardim Satélite, São José dos Campos - SP. O site apresenta:

- **Serviços oferecidos**: Musculação, Aulas Coletivas, Treino Personalizado, Avaliação Física
- **Aulas Coletivas**: Flashback, Pilates, WolfFit, GAP, FitDance, Jump, Muay Thai, Jiu Jítsu
- **Informações de contato e localização**
- **Sistema de agendamento de aula experimental**
- **Planos e preços**

## 🎨 Design System

O projeto utiliza um design system personalizado com:

- **Tema**: Dark (escuro) com acentos verdes vibrantes
- **Cor Primária**: #22c55e (Verde)
- **Cores Neutras**: Tons de cinza escuro para backgrounds e bordas
- **Tipografia**: Sistema de fontes sans-serif
- **Layout**: Single-column, centrado com max-width de 768px

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones modernos
- **Responsive Design** - Otimizado para todos os dispositivos

## 📁 Estrutura do Projeto

```
panobianco-website/
├── app/                          # App Router do Next.js 14
│   ├── globals.css              # Estilos globais e design system
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Página inicial
│   ├── sobre-nos/               # Página Sobre Nós
│   ├── aulas-coletivas/         # Página das Aulas Coletivas
│   ├── contato/                 # Página de Contato
│   └── aula-experimental/       # Página de Agendamento
├── components/                  # Componentes reutilizáveis
│   ├── Header.tsx               # Cabeçalho com navegação
│   └── Footer.tsx               # Rodapé
├── design.json                  # Especificação do design system
├── sitemap-and-content.md      # Conteúdo e estrutura do site
└── tailwind.config.js          # Configuração do Tailwind
```

## 🏃‍♂️ Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd panobianco-website
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 📱 Páginas Implementadas

### ✅ Completas
- **Página Inicial** (`/`) - Hero, serviços, depoimentos, localização
- **Sobre Nós** (`/sobre-nos`) - História, missão, valores, equipe
- **Aulas Coletivas** (`/aulas-coletivas`) - Overview de todas as modalidades
- **Contato** (`/contato`) - Formulário, informações, FAQ
- **Agendamento de aula experimental** - Via WhatsApp (CTAs em todo o site)

### 🔄 Em Desenvolvimento
- Páginas individuais de cada aula coletiva
- Página de Serviços detalhada
- Página de Planos e Preços
- Blog
- Páginas legais (Política de Privacidade, Termos de Uso)

## 🎯 Funcionalidades

- ✅ Design responsivo para todos os dispositivos
- ✅ Navegação móvel com menu hambúrguer
- ✅ Formulários de contato funcionais
- ✅ Sistema de cores e tipografia consistente
- ✅ Componentes reutilizáveis
- ✅ SEO otimizado com metadados
- ✅ Acessibilidade (cores de contraste, foco, etc.)

## 📞 Informações da Academia

- **Nome**: Academia Panobianco Jardim Satélite
- **Endereço**: Av. Cidade Jardim, 391 - Jardim Satélite, São José dos Campos - SP
- **CEP**: 12231-675
- **Telefone**: (12) 99219-2268
- **Horários**: 
  - Segunda a Sexta: 05h00 às 23h00
  - Sábado: 08h00 às 18h00
  - Domingo: 09h00 às 13h00

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é proprietário da Academia Panobianco Jardim Satélite.

---

Desenvolvido com ❤️ para a Academia Panobianco Jardim Satélite 