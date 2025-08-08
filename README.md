# Datas - Funções Utilitárias 🗓️

Projeto JavaScript vanilla com utilitários para manipulação de datas, desenvolvido com **vibe coding** usando [Claude Code](https://claude.ai/code).

## 🚀 Demo

Acesse o projeto online: **[Days Utils](https://dwildt.github.io/datas)**

## ✨ Funcionalidades

### 🗓️ Utilitários Principais
- **Diferença entre datas**: Calcule a diferença em dias entre duas datas
- **Dias desde data**: Veja quantos dias se passaram desde uma data específica
- **Fases da Lua**: Visualize as fases lunares para qualquer mês/ano
- **Calendário mensal**: Interface visual do calendário com destaque do dia atual

### 🛠️ Utilitários Extras
- **Cálculo de idade**: Idade completa em anos, meses e dias
- **Formatação de datas**: Multiple formatos (DD/MM/YYYY, extenso, etc.)
- **Informações adicionais**: Dia da semana, trimestre, semana do ano
- **Validações**: Verificação de fim de semana, anos bissextos

## 🌙 Algoritmo de Fases Lunares

O cálculo das fases da lua utiliza:
- **Algoritmo astronômico** baseado no dia juliano
- **Ciclo sinódico lunar** de ~29,53 dias
- **8 fases distintas**: Nova, Crescente, Quarto Crescente, Gibosa Crescente, Cheia, Gibosa Minguante, Quarto Minguante, Minguante
- **Precisão astronômica** para cálculos históricos e futuros

## 🎨 Design

- **Gradiente Wildtech**: Cores laranja (#ff7b00) e marrom (#8b4513)
- **Design responsivo** para desktop e mobile
- **Interface intuitiva** com feedback visual
- **Ícones de lua** para visualização das fases lunares

## 📁 Estrutura do Projeto

```
datas/
├── index.html          # Interface principal
├── styles.css          # Estilos responsivos
├── date-utils.js       # Classe com funções utilitárias
├── app.js             # Lógica de interação da interface
└── README.md          # Este arquivo
```

## 🚀 Como usar no GitHub Pages

1. **Fork ou clone** este repositório
2. Vá nas **Settings** do repositório
3. Na seção **Pages**, selecione:
   - Source: "Deploy from a branch"
   - Branch: "main" 
   - Folder: "/ (root)"
4. Clique em **Save**
5. Seu site estará disponível em: `https://dwildt.github.io/nome-do-repositorio`

## 💻 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com Flexbox/Grid e gradientes
- **JavaScript ES6+** - Lógica pura (vanilla)
- **GitHub Pages** - Hospedagem gratuita

## 🛠️ Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/dwildt/datas.git

# Entre no diretório
cd datas

# Abra o index.html no navegador
# Ou use um servidor local como Live Server
```

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um **Fork** do projeto
2. Criar uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um **Pull Request**

## 📜 Licença

Este projeto é open source e está disponível sob a [MIT License](LICENSE.md).

## ❤️ Desenvolvido com

- 💻 **Vibe Coding** - Metodologia de desenvolvimento
- 🤖 **[Claude Code](https://claude.ai/code)** - Assistente de programação
- 🎨 **Wildtech** - Identidade visual

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!