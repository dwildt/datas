# 🧪 Testes Unitários - Days Utils

Este projeto inclui uma suíte completa de testes unitários usando **Jest** para garantir a qualidade e confiabilidade do código.

## 📦 Instalação das Dependências

```bash
# Instalar dependências de desenvolvimento
npm install
```

## 🚀 Executando os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch (re-executa quando arquivos mudam)
```bash
npm run test:watch
```

### Executar testes com relatório de cobertura
```bash
npm run test:coverage
```

## 📊 Cobertura de Testes

Os testes cobrem:

### 🗓️ DateUtils Class (`date-utils.test.js`)
- ✅ **Cálculo de diferenças entre datas** (`daysBetween`, `daysSince`)
- ✅ **Cálculo de idade** (`calculateAge`)
- ✅ **Formatação de datas** (múltiplos formatos)
- ✅ **Validações** (anos bissextos, fins de semana)
- ✅ **Geração de calendários** (`generateCalendar`)
- ✅ **Manipulação de datas** (`addDays`, `addMonths`)
- ✅ **Utilitários de tempo** (semana do ano, trimestres)
- ✅ **Fases da lua** (algoritmos astronômicos completos)
- ✅ **Duração formatada** (`formatDuration`)

### 🖥️ App Functions (`app.test.js`)
- ✅ **Cálculo de diferenças** (`calculateDifference`)
- ✅ **Dias desde data** (`daysSince`)
- ✅ **Geração de calendário** (`generateCalendar`)
- ✅ **Cálculo de idade** (`calculateAge`)
- ✅ **Formatação de datas** (`formatDate`)
- ✅ **Fases da lua** (`generateMoonPhases`)
- ✅ **Validações de entrada** (campos vazios)
- ✅ **Tratamento de erros** (mensagens de erro)
- ✅ **Event handlers** (DOM ready)

## 🏗️ Arquitetura dos Testes

### Configuração
- **`jest.setup.js`**: Mock de elementos DOM e APIs do navegador
- **`package.json`**: Configuração do Jest com jsdom
- **Ambiente**: jsdom para simular o navegador

### Mocks Utilizados
- **DOM Elements**: `document.getElementById`, `document.querySelector`
- **Date Objects**: Para testes determinísticos
- **Functions**: Spy em funções do DateUtils para testes isolados

### Estrutura dos Testes
```
describe('NomeDaClasse/Função', () => {
  describe('métodoEspecífico', () => {
    test('deve fazer algo específico', () => {
      // Arrange - Setup
      // Act - Execução
      // Assert - Verificação
    });
  });
});
```

## 📈 Cenários de Teste

### ✅ Casos de Sucesso
- Dados válidos e formatação correta
- Cálculos matemáticos precisos
- Geração de interfaces corretas

### ⚠️ Casos de Erro
- Campos vazios ou não preenchidos
- Datas inválidas ou futuras
- Estados de erro da aplicação

### 🔄 Casos Extremos
- Anos bissextos vs não bissextos  
- Mudanças de mês/ano
- Fases lunares em diferentes períodos
- Cálculos de calendários complexos

## 🎯 Qualidade do Código

### Cobertura Esperada
- **Linhas**: >95%
- **Funções**: 100%
- **Branches**: >90%
- **Statements**: >95%

### Benefícios dos Testes
- 🛡️ **Confiabilidade**: Código testado é código confiável
- 🔄 **Refatoração segura**: Mudanças sem quebrar funcionalidades
- 📖 **Documentação**: Testes servem como documentação viva
- 🚀 **Deploy confiante**: CI/CD com validação automatizada
- 🐛 **Detecção precoce**: Bugs encontrados antes da produção

## 🛠️ Desenvolvimento

### Adicionando Novos Testes
1. Criar arquivos `.test.js` para novas funcionalidades
2. Seguir padrão AAA (Arrange, Act, Assert)
3. Incluir casos de sucesso, erro e extremos
4. Usar mocks para isolar dependências

### Debugging
```bash
# Executar teste específico
npm test -- --testNamePattern="calculateDifference"

# Executar arquivo específico
npm test date-utils.test.js

# Modo verbose (mais detalhes)
npm test -- --verbose
```

---

💡 **Dica**: Execute `npm run test:coverage` regularmente para manter alta qualidade de código!