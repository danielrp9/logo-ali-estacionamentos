# Logo Ali Estacionamentos

Sistema de **Gerenciamento Inteligente de Estacionamentos** desenvolvido como um ecossistema **Full-Stack (Django + React)** para a disciplina de **Segurança e Auditoria de Sistemas de Informação - SASI**.

O **Logo Ali** oferece controle de pátio em tempo real, auditoria de movimentação, integração com pagamentos via **Stripe** e geração dinâmica de **QR Codes** para liberação de veículos.

---

# Estrutura do Projeto

O sistema foi arquitetado de forma unificada. O **Django** atua como API REST e também como servidor dos arquivos estáticos do **React**, permitindo que todo o sistema seja acessado através de uma única porta.

```
logo-ali-project/
│
├── logo-ali-app/        # Servidor Backend (Django) + Static Files
│   ├── estacionamento/  # App do Sistema (Models, API Views, Serializers)
│   ├── logo_ali/        # Configurações do Core Django
│   └── static/dist/     # Build do Frontend (Interface React)
│
├── frontend/            # Código-fonte da interface (React + Vite)
└── README.md            # Documentação de Auditoria
```

---

# Requisitos para Execução

* **Python 3.10+**
* **Node.js 18+** e **npm**
* **Git**

---

# Guia de Instalação e Auditoria

### 1. Clonar o Repositório
```bash
git clone https://github.com/danielrp9/logo-ali.git
cd logo-ali-project
```

### 2. Preparação do Backend (Django)
```bash
cd logo-ali-app
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configuração do Stripe 
Como o sistema utiliza o Stripe para o fluxo de checkout, é necessário gerar uma chave de teste:

1.  Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/register) e crie uma conta (gratuita).
2.  No menu superior, certifique-se de que a opção **"Test Mode"** está ativada.
3.  Vá em **Developers > API Keys**.
4.  Copie a **Publishable key** (começa com `pk_test_`) e a **Secret key** (começa com `sk_test_`).

### 4. Configuração do Arquivo `.env`
Crie um arquivo `.env` dentro da pasta `logo-ali-app/` e preencha com as chaves obtidas no passo anterior:
```env
SECRET_KEY=sua_chave_secreta_django_qualquer
DEBUG=True

STRIPE_PUBLIC_KEY=pk_test_COLE_AQUI_SUA_CHAVE_PUBLICA
STRIPE_SECRET_KEY=sk_test_COLE_AQUI_SUA_CHAVE_PRIVADA
```

### 5. Banco de Dados e Acesso Administrativo
```bash
python manage.py migrate
python manage.py createsuperuser  
```

### 6. Compilação do Frontend (React)
```bash
cd ../frontend
npm install
npm run build
```

---

# Execução do Sistema

Com o ambiente virtual ativado e na pasta `logo-ali-app`, inicie o servidor:
```bash
python manage.py runserver
```

**Acesse o sistema unificado em:**
[http://127.0.0.1:8000](http://127.0.0.1:8000)

> **Nota para Testes de Pagamento:** Ao realizar um checkout, utilize os números de [cartões de teste oficiais do Stripe](https://docs.stripe.com/testing) (Ex: Cartão `4242 4242 4242 4242`, qualquer validade futura e CVC `123`).

---

# Funcionalidades para Análise

* **Pátio em Tempo Real**: Monitoramento dinâmico de veículos ativos.
* **Checkout Stripe**: Integração completa com gateway de pagamento (Modo Teste).
* **Geração de QR Code**: Tokens dinâmicos para liberação e conferência de saída.
* **Dashboard Operacional**: Interface otimizada para desktop e dispositivos móveis.

---

# Autor

**Daniel Rodrigues Pereira**
Acadêmico de **Sistemas de Informação** — **UFVJM (Diamantina, MG)**.