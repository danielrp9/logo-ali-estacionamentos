# 🚗 Logo Ali Estacionamentos


Sistema de **gerenciamento inteligente de estacionamentos** desenvolvido como um ecossistema **Full-Stack (Django + React)** para a disciplina de **Engenharia Web**.

O **Logo Ali** oferece controle de pátio em tempo real, auditoria de movimentação, integração com pagamentos via **Stripe** e geração dinâmica de **QR Codes** para liberação de veículos.

---

# 🧰 Tecnologias Utilizadas

## Backend (API REST)

* **Python 3.10+**
* **Django 5.x**
* **Django REST Framework (DRF)** — Fornecimento de endpoints JSON
* **SQLite3** — Banco de dados padrão
* **Stripe SDK** — Processamento de pagamentos
* **Django REST Framework Authtoken** — Sistema de autenticação por tokens

---

## Frontend (SPA)

* **React.js** + **Vite**
* **Lucide React** — Biblioteca de ícones
* **Axios** — Consumo da API REST
* **QRCode.react** — Geração de QR Codes
* **React Router DOM** — Navegação em Single Page Application

---

# ⚙️ Requisitos

Antes de iniciar, certifique-se de possuir instalado:

* **Python 3.10** ou superior
* **Node.js 18+** e **npm**
* **Git**

---

# 🚀 Instalação e Configuração

## 1. Clonar o Repositório

```bash
git clone https://github.com/danielrp9/logo-ali.git
cd logo-ali-webapp
```

---

# 🖥️ Configuração do Backend (Django)

## Criar Ambiente Virtual

```bash
cd logo-ali-ufvjm

python -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\Scripts\activate
```

---

## Instalar Dependências

```bash
pip install django djangorestframework django-cors-headers stripe python-dotenv
```

---

## Gerenciar Dependências

Sempre que adicionar novas bibliotecas:

```bash
pip freeze > requirements.txt
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta **logo-ali-ufvjm**:

```env
SECRET_KEY=sua_chave_secreta
DEBUG=True

STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

---

## Banco de Dados e Servidor

```bash
python manage.py migrate
python manage.py runserver
```

O backend estará disponível em:

```
http://127.0.0.1:8000
```

---

# 🌐 Configuração do Frontend (React)

## Instalar Dependências

```bash
cd ../frontend
npm install
```

Caso seja necessário instalar manualmente:

```bash
npm install lucide-react qrcode.react axios react-router-dom
```

---

## Executar em Desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em:

```
http://localhost:5173
```

---

# ✨ Funcionalidades Principais

* **Pátio em Tempo Real**
  Monitoramento dinâmico dos veículos estacionados.

* **Checkout com Stripe**
  Fluxo completo de pagamento digital integrado.

* **Extrato de Permanência**
  Geração automática de comprovante com cálculo de horas e QR Code para saída.

* **Dashboard Operacional**
  Interface adaptável para **desktop e dispositivos móveis**.

* **Histórico de Auditoria**
  Registro completo de entradas e saídas para controle administrativo.

---

# 🗂 Estrutura do Projeto

```
LogoAli/
│
├── logo-ali-ufvjm/        # Backend Django
│   ├── estacionamento/      # App principal (Models, API Views)
│   ├── logo-ali/          # Configurações do projeto
│   └── requirements.txt     # Dependências Python
│
├── frontend/                # Frontend React + Vite
│   ├── src/                 # Componentes, páginas e API
│   └── package.json         # Dependências Node
│
├── LICENSE                  # Licença do projeto
└── README.md                # Documentação principal
```

---

# 🔧 Observações Técnicas

* **Comunicação entre sistemas**
  O frontend se comunica com o backend via endpoints REST no prefixo:

  ```
  /api/
  ```

* **Autenticação**
  Rotas administrativas utilizam **tokens de autenticação**.

* **Design Responsivo**
  Interface baseada na estética **Deep Earth / Kinetic Tech**, otimizada para dispositivos móveis.

---

# 📄 Licença

Este projeto é protegido por **direitos autorais**.
Consulte o arquivo **LICENSE** para mais detalhes sobre os termos de uso.

---

# 👨‍💻 Autor

**Daniel Rodrigues Pereira**
Acadêmico de **Sistemas de Informação** — **UFVJM (Diamantina, MG)**


