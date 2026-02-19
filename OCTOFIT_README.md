# 🏋️ OctoFit Tracker

Um aplicativo completo de rastreamento de fitness com React frontend, Django REST backend e MongoDB database.

## 🚀 Como Iniciar o Aplicativo

### ⚠️ IMPORTANTE: Acesse a porta correta!

- **Frontend (React)**: http://localhost:3000 ou https://SEU-CODESPACE-3000.app.github.dev
- **Backend (API)**: http://localhost:8000 ou https://SEU-CODESPACE-8000.app.github.dev/api/

❌ **NÃO acesse a porta 8000 no navegador** - ela mostra apenas a API REST
✅ **Acesse a porta 3000** - ela mostra o aplicativo React completo

### Opção 1: Script Automático

```bash
./start-octofit.sh
```

Depois acesse: http://localhost:3000

### Opção 2: Inicialização Manual

1. **Iniciar Backend (Django)**
   ```bash
   source octofit-tracker/backend/venv/bin/activate
   cd octofit-tracker/backend
   python manage.py runserver 0.0.0.0:8000
   ```

2. **Iniciar Frontend (React)** - em outro terminal
   ```bash
   npm start --prefix octofit-tracker/frontend
   ```

3. **Acessar o aplicativo**
   - Abra: http://localhost:3000
   - O navegador deve abrir automaticamente

### Para Parar o Aplicativo

```bash
./stop-octofit.sh
```

Ou manualmente:
```bash
kill -9 $(lsof -ti:8000)  # Para Django
kill -9 $(lsof -ti:3000)  # Para React
```

## 📁 Estrutura do Projeto

```
octofit-tracker/
├── backend/
│   ├── venv/                    # Virtual environment Python
│   ├── manage.py
│   ├── requirements.txt
│   └── octofit_tracker/
│       ├── models.py            # Modelos MongoDB
│       ├── serializers.py       # Serializers REST
│       ├── views.py             # ViewSets REST API
│       ├── urls.py              # Rotas da API
│       └── settings.py          # Configurações Django
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js               # Componente principal + rotas
    │   ├── App.css              # Estilos principais
    │   └── components/
    │       ├── Activities.js    # Página de atividades
    │       ├── Leaderboard.js   # Ranking de usuários
    │       ├── Teams.js         # Gerenciamento de equipes
    │       ├── Users.js         # Lista de usuários
    │       └── Workouts.js      # Treinos personalizados
    ├── package.json
    └── .env                     # Variáveis de ambiente
```

## 🌟 Funcionalidades

- ✅ **Autenticação de Usuários** - Sistema de login seguro
- ✅ **Rastreamento de Atividades** - Registre corridas, exercícios e mais
- ✅ **Gerenciamento de Equipes** - Crie e junte-se a equipes
- ✅ **Leaderboard Competitivo** - Veja quem está no topo
- ✅ **Sugestões de Treinos** - Planos personalizados
- ✅ **Interface Moderna** - Design responsivo com Bootstrap

## 🔧 Tecnologias

### Backend
- Python 3.10
- Django 4.1.7
- Django REST Framework 3.14.0
- MongoDB (via Djongo)
- CORS Headers para integração frontend

### Frontend
- React 19.2.4
- React Router DOM 7.13.0
- Bootstrap 5.3.8
- Modern CSS com gradientes e animações

## 📊 Endpoints da API

- `GET /api/users/` - Lista de usuários
- `GET /api/teams/` - Lista de equipes
- `GET /api/activities/` - Lista de atividades
- `GET /api/leaderboard/` - Ranking de pontos
- `GET /api/workouts/` - Treinos sugeridos

## 🐛 Problemas Comuns

### Porta 8000 já em uso
```bash
kill -9 $(lsof -ti:8000)
```

### Porta 3000 já em uso
```bash
kill -9 $(lsof -ti:3000)
```

### MongoDB não está rodando
```bash
mongod --dbpath /data/db --fork --logpath /tmp/mongod.log
```

### React mostra página em branco
- Verifique se .env está configurado corretamente
- Limpe o cache: `npm start --prefix octofit-tracker/frontend -- --reset-cache`

## 📝 Configuração de Ambiente

### Backend (.env - se necessário)
Configurações estão no `settings.py`

### Frontend (.env)
```env
REACT_APP_CODESPACE_NAME=seu-codespace-name
```

Se estiver em desenvolvimento local, deixe vazio - o app usará `http://localhost:8000` automaticamente.

## 🎨 Personalizações

### Mudar cores do tema
Edite: `octofit-tracker/frontend/src/App.css`

### Adicionar novos componentes
1. Crie em: `octofit-tracker/frontend/src/components/`
2. Adicione rota em: `octofit-tracker/frontend/src/App.js`

### Adicionar novos endpoints
1. Modelos: `octofit-tracker/backend/octofit_tracker/models.py`
2. Serializers: `octofit-tracker/backend/octofit_tracker/serializers.py`
3. Views: `octofit-tracker/backend/octofit_tracker/views.py`
4. URLs: `octofit-tracker/backend/octofit_tracker/urls.py`

## 📚 Recursos

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/)

## 👥 Contribuindo

Este é um projeto educacional desenvolvido para demonstrar integração React + Django + MongoDB.

---

**Desenvolvido com ❤️ para o GitHub Copilot Workshop**
