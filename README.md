# ☕ AI Coffee Assistant

Assistente inteligente para cafeteria utilizando IA generativa, RAG e memória contextual.

O sistema é capaz de:

- recomendar itens do cardápio
- consultar cardápio via RAG
- armazenar preferências do usuário
- evitar alergênicos
- personalizar respostas
- utilizar memória contextual
- proteger contra Prompt Injection

---

# 🚀 Tecnologias

- Next.js
- TypeScript
- Mastra
- Ollama
- ChromaDB
- SQLite

---

# 🧠 Arquitetura Simplificada

```txt
Usuário
   ↓
Validação de entrada
   ↓
Extração de fatos
   ↓
Persistência de memória
   ↓
Coffee Agent
   ↓
RAG Search Tool
   ↓
ChromaDB
   ↓
Resposta personalizada
```

---

# 📂 Estrutura Simplificada

```txt
src/
 ├── app/
 │    ├── (authenticated)/
 │    ├── (public)/
 │    └── api
 │
 ├── mastra/
 │    ├── agents/
 │    └── tools/
 │
 ├── repository/
 |     ├── chat/
 │     ├── facts/
 │     └── user/
 │ 
 ├── service/
 │    ├── rag/
 │    ├── user/
 │    └── chat/
 │
 └── database/
```

---

# ⚙️ Como Rodar o Projeto

## 1. Instalar dependências

```bash
npm install
```

---

## 2. Instalar o Ollama

https://ollama.com/download

---

## 3. Baixar o modelo

```bash
ollama pull qwen2.5:7b
```

---

## 4. Iniciar o Ollama

```bash
ollama run qwen2.5:7b
```

---

## 5. Instalar o Docker

```
Docker Desktop(windows): https://www.docker.com/products/docker-desktop/
ou
Instalação no Linux: sudo apt-get remove docker docker-engine docker.io containerd runc

```

## 6. Subir o container

```
Docker compose up -d

```

## 7. seeding o vectorDb (ChromaDB)

```bash
npm run seed:knowledge
```

## 8. Crie o arquivo de .env seguindo as variáveis do env-exemple

## 9. Rodar o projeto

```bash
npm run dev
```


# 📚 Aprendizados

Durante o desenvolvimento do projeto, os principais aprendizados foram:

- funcionamento de RAG
- embeddings e similarity search
- arquitetura de agents
- tool calling
- memória contextual
- ranking de documentos
- limitações de LLMs locais
- segurança contra Prompt Injection
- validação de fatos antes de persistência
- importância de schema validation

---

# 🏁 Conclusão

O projeto evoluiu de um chatbot simples para uma arquitetura moderna baseada em:

- agentes
- memória
- RAG
- embeddings
- tools
- persistência contextual

Além disso, proporcionou aprendizados importantes sobre arquitetura de IA generativa e segurança aplicada a agentes.