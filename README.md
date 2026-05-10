# Logo Ali Estacionamentos

Sistema de **Gerenciamento Inteligente de Estacionamentos** desenvolvido como um ecossistema **Full-Stack (Django + React)** para a disciplina de **Segurança e Auditoria de Sistemas de Informação - SASI**.

O **Logo Ali** oferece controle de pátio em tempo real, auditoria de movimentação, integração com pagamentos via **Stripe** e segurança de tráfego baseada em **SSL Dual-Protocol**.

---

# Estrutura do Projeto

O sistema utiliza uma arquitetura híbrida onde o **Nginx** atua como Proxy Reverso para gerenciamento de criptografia, enquanto o **Django** processa a lógica de negócios e serve o build do **React**.

```
logo-ali-project/
│
├── logo-ali-app/        # Servidor Backend (Django) + Static Files
│   ├── estacionamento/  # App (Middleware de Portaria, Models, API)
│   ├── logo_ali/        # Configurações Core
│   └── static/dist/     # Build do Frontend (Interface React)
│
├── frontend/            # Código-fonte da interface (React + Vite)
├── certs/               # Certificados SSL (Desenvolvimento)
└── README.md            # Documentação de Auditoria e Setup

```

---

# Requisitos para Execução

* **Python 3.10+**
* **Node.js 18+** e **npm**
* **Nginx** (Essencial para a infraestrutura de segurança)
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

### 3. Configuração de Segurança SSL (Norma N08.6 PSI)

Para que a funcionalidade de HTTPS e o redirecionamento automático operem corretamente, é vital a padronização dos certificados.

**Nota de Padronização:** O arquiteto do sistema deve compartilhar os arquivos de certificados (`server.crt` e `server.key`) para que todos os membros utilizem as mesmas credenciais SSL em modo de desenvolvimento.

**A. Preparar Diretório de Certificados:**

```bash
sudo mkdir -p /etc/nginx/logoali-certs/
# Copie os arquivos compartilhados pelo arquiteto para a pasta universal
sudo cp ../certs/server.crt /etc/nginx/logoali-certs/
sudo cp ../certs/server.key /etc/nginx/logoali-certs/

```

**B. Configurar Nginx:**

```bash
sudo cp ../logoali.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/logoali.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

```

### 4. Configuração do Stripe

Como o sistema utiliza o Stripe para o fluxo de checkout, é necessário gerar uma chave de teste:

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/register) e crie uma conta (gratuita).
2. No menu superior, certifique-se de que a opção **"Test Mode"** está ativada.
3. Vá em **Developers > API Keys**.
4. Copie a **Publishable key** (começa com `pk_test_`) e a **Secret key** (começa com `sk_test_`).

### 5. Configuração do Arquivo `.env`

Crie um arquivo `.env` dentro da pasta `logo-ali-app/`.

Para a variável `SECRET_KEY`, é necessário gerar uma chave aleatória segura via terminal com o seguinte comando:

```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'

```

Preencha o arquivo com as informações obtidas:

```env
SECRET_KEY=cole_a_chave_gerada_pelo_comando_acima
DEBUG=True

STRIPE_PUBLIC_KEY=pk_test_COLE_AQUI_SUA_CHAVE_PUBLICA
STRIPE_SECRET_KEY=sk_test_COLE_AQUI_SUA_CHAVE_PRIVADA

```

### 6. Banco de Dados e Build

```bash
python manage.py migrate
python manage.py createsuperuser  

cd ../frontend
npm install && npm run build

```

---

# Execução do Sistema

Com o ambiente virtual ativado na pasta `logo-ali-app`, inicie o servidor:

```bash
python manage.py runserver

```

**Acesso via Proxy Seguro (Nginx):**

* **Navegação Comum:** [http://localhost](https://www.google.com/search?q=http://localhost) (Porta 80)
* **Navegação Sensível:** O sistema redirecionará automaticamente para [https://localhost](https://www.google.com/search?q=https://localhost) (Porta 443) ao acessar rotas de Login ou Cadastro.

> **Nota para Testes de Pagamento:** Utilize os números de [cartões de teste oficiais do Stripe](https://docs.stripe.com/testing) (Ex: `4242 4242 4242 4242`).

---

# Funcionalidades para Análise de Auditoria

* **ProtocolEnforcerMiddleware**: "Portaria" de segurança que gerencia a transição HTTP/HTTPS no nível da aplicação.
* **Dual-Block Nginx**: Separação física de portas para tráfego público e tráfego encriptado.
* **HSTS & Hard Redirects**: Garantia de que o navegador mantenha a integridade do protocolo seguro.
* **QR Code Dinâmico**: Geração de tokens de acesso vinculados à confirmação de pagamento via Stripe.

---

# Autor

**Daniel Rodrigues Pereira**
Acadêmico de **Sistemas de Informação** — **UFVJM (Diamantina, MG)**.