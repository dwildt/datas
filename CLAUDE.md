# 🤖 Claude AI - Guia de Apoio ao Desenvolvimento

Este arquivo fornece orientações para desenvolvedores que desejam usar **Claude AI** para trabalhar com o projeto **Datas**.

## 📋 Contexto do Projeto

### Sobre o Projeto
- **Nome**: Datas - Funções Utilitárias
- **Tipo**: JavaScript vanilla com utilitários para manipulação de datas
- **Metodologia**: Desenvolvido com **vibe coding** usando Claude Code
- **Tecnologias**: HTML5, CSS3, JavaScript ES6+, Jest

### Estrutura Principal
```
datas/
├── index.html          # Interface principal
├── styles.css          # Estilos responsivos com gradiente Wildtech
├── date-utils.js       # Classe DateUtils com funções utilitárias
├── app.js             # Lógica de interação da interface
├── *.test.js          # Testes unitários (Jest)
├── README.md          # Documentação principal
├── TESTING.md         # Documentação de testes
└── CLAUDE.md          # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### Core Features
- Cálculo de diferenças entre datas
- Fases da lua (algoritmo astronômico)
- Calendário mensal interativo
- Cálculo de idade completa
- Formatação de datas múltipla
- Validações de datas

### Características Técnicas
- **100% Vanilla JavaScript** - Sem frameworks
- **Testes unitários completos** - 54 testes passando
- **Design responsivo** - Mobile-first
- **GitHub Pages ready** - Deploy automático

## 🚀 Metodologia de Desenvolvimento

### Vibe Coding com Claude
Este projeto foi desenvolvido usando a metodologia **vibe coding**:
1. **Iterações rápidas** - Desenvolvimento incremental
2. **Feedback contínuo** - Teste constante de funcionalidades
3. **Claude como pair programmer** - Assistência em código e arquitetura
4. **Foco na experiência** - UX/UI priorizados

### Padrões Estabelecidos
- **Classes ES6** para organização do código
- **Modularização** clara entre utils e interface
- **Testes first** - TDD approach
- **Documentação viva** - README atualizado constantemente

## 💡 Prompts Úteis para Claude

### Para Desenvolvimento de Features
```
Contexto: Projeto JavaScript vanilla de utilitários de data com classe DateUtils e interface em app.js. Usa Jest para testes. Design responsivo com gradiente laranja/marrom.

Tarefa: [descreva a feature]

Considerações:
- Manter padrão ES6 das classes existentes
- Adicionar testes unitários
- Seguir design responsivo
- Documentar no README se necessário
```

### Para Debugging
```
Analisando projeto Datas (JavaScript vanilla + Jest):

Problema: [descreva o problema]

Arquivos relevantes:
- date-utils.js (classe principal)
- app.js (interface)
- [arquivo específico].test.js (testes)

Console/erro: [cole aqui]
```

### Para Refatoração
```
Projeto Datas - Refatoração:

Contexto atual: [descreva o código atual]
Objetivo: [o que quer melhorar]

Restrições:
- Manter compatibilidade com testes existentes
- Não quebrar interface atual
- Manter padrão de código vanilla
```

## 🧪 Contexto de Testes

### Framework e Configuração
- **Jest** com jsdom environment
- **Cobertura** >95% esperada
- **Setup**: `jest.setup.js` para mocks DOM

### Padrão de Testes
```javascript
describe('NomeDaClasse', () => {
  describe('métodoEspecífico', () => {
    test('deve fazer algo específico', () => {
      // Arrange
      const input = 'valor';
      
      // Act
      const result = DateUtils.método(input);
      
      // Assert
      expect(result).toBe('esperado');
    });
  });
});
```

### Comandos Úteis
```bash
npm test              # Todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Com cobertura
```

## 🎨 Design System

### Cores Wildtech
- **Primária**: `#ff7b00` (Laranja)
- **Secundária**: `#8b4513` (Marrom)
- **Gradiente**: `linear-gradient(135deg, #ff7b00, #8b4513)`

### Responsividade
- **Mobile first** approach
- **Flexbox/Grid** para layouts
- **Breakpoints** padrão para tablet/desktop

## 📚 Contexto Específico para Claude

### Ao Trabalhar com Datas
```
Este projeto usa algoritmos astronômicos para fases lunares:
- Ciclo sinódico lunar: ~29,53 dias
- Cálculo baseado em dia juliano
- 8 fases distintas implementadas
```

### Ao Trabalhar com Testes
```
Padrão de mocks estabelecido:
- DOM elements mockados em jest.setup.js
- Date objects para testes determinísticos
- Spy functions para isolamento de testes
```

### Ao Trabalhar com Interface
```
Interface segue padrão:
- IDs semânticos (calculateBtn, resultDiv, etc.)
- Event listeners no DOMContentLoaded
- Feedback visual para erros/sucessos
- Responsividade mobile-first
```

## 🔧 Guidelines de Desenvolvimento

### Para Adicionar Nova Funcionalidade
1. **Implementar** na classe DateUtils
2. **Testar** com Jest (casos sucesso/erro/extremos)
3. **Integrar** na interface (app.js)
4. **Documentar** no README se relevante
5. **Verificar** responsividade

### Para Corrigir Bugs
1. **Reproduzir** com teste unitário
2. **Corrigir** mantendo cobertura
3. **Validar** que não quebra outros testes
4. **Testar** manualmente na interface

### Para Refatoração
1. **Manter** todos os testes passando
2. **Preservar** interface pública
3. **Documentar** mudanças significativas
4. **Validar** performance se necessário

## 🚀 Deploy e CI/CD

### GitHub Pages
- **Branch**: main
- **Pasta**: root (/)
- **URL**: `https://dwildt.github.io/datas`

### Workflow
1. **Push** para main
2. **GitHub Actions** (se configurado)
3. **Deploy** automático
4. **Testes** devem passar antes do deploy

## 💡 Dicas de Produtividade

### Desenvolvimento Local
```bash
# Clone e setup
git clone https://github.com/dwildt/datas.git
cd datas
npm install

# Desenvolvimento
# Abrir index.html no browser + Live Server
# Rodar testes em watch mode: npm run test:watch
```

### Debugging com Claude
- **Sempre** inclua o contexto do projeto
- **Compartilhe** código relevante completo
- **Mencione** se há testes falhando
- **Especifique** ambiente (browser/Node)

---

💡 **Dica**: Use este arquivo como referência ao solicitar ajuda do Claude para manter consistência no desenvolvimento!

---

🤖 **Desenvolvido com Claude AI** | 🎨 **Design Wildtech** | ⭐ **Open Source MIT**