 .# Logo Ali Estacionamentos

Sistema de **Gerenciamento Inteligente de Estacionamentos** desenvolvido como um ecossistema **Full-Stack (Django + React)** para a disciplina de **Segurança e Auditoria de Sistemas de Informação - SASI** na **Universidade Federal dos Vales do Jequitinhonha e Mucuri (UFVJM)**.

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
* **OpenSSL** (Para auditoria ou regeneração de chaves)

---

# Guia de Instalação e Auditoria

### 1. Clonar o Repositório

```bash
git clone [https://github.com/danielrp9/logo-ali.git](https://github.com/danielrp9/logo-ali.git)
cd logo-ali-project

```

### 2. Preparação do Backend (Django)

```bash
cd logo-ali-app
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

```

### 3. Instalação e Ativação do Servidor Nginx

Antes de configurar as rotas seguras, garanta que o servidor web esteja presente e operacional no seu sistema operacional Linux (Ubuntu/Debian) utilizando o gerenciador de pacotes `apt`:

```bash
sudo apt update
sudo apt install nginx

```

Para confirmar se o serviço está ativo e ouvindo as requisições de rede, execute:

```bash
sudo systemctl status nginx

```

---

# 🔐 Infraestrutura de Chaves Públicas e Criptografia (OpenSSL)

Para fins de auditoria acadêmica, o projeto possui suporte completo à geração e validação de criptografia assimétrica baseada no algoritmo RSA de 2048 bits.

### Geração Original dos Ativos de Segurança (Para conhecimento)

O processo documentado na arquitetura original utiliza três comandos essenciais executados dentro do diretório `/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs`:

1. **Geração da Chave Privada (Private Key):** Componente que criptografa os dados no servidor.
```bash
openssl genrsa -out server.key 2048

```


2. **Geração do Pedido de Assinatura (CSR):** Vinculação da identidade digital à Logo Ali Estacionamentos com os metadados (`BR`, `Minas Gerais`, `Diamantina`, `Logo Ali Estacionamentos`, `Desenvolvimento`, `localhost`).
```bash
openssl req -new -key server.key -out server.csr

```


3. **Emissão do Certificado Autoassinado (X.509):** Chave pública assinada com validade de 365 dias.
```bash
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

```



### ⚠️ Nota de Padronização para Auditoria Cruzada

Para garantir que não ocorram erros de sincronismo, incompatibilidade de chaves ou inconsistências durante a avaliação do sistema, **os arquivos originais de certificados (`server.crt` e `server.key`) serão enviados separadamente pelo arquiteto do sistema**.

Eles devem ser obrigatoriamente inseridos na pasta raiz de certificados localizada em:
`/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs`

A estrutura interna esperada pelo ambiente de segurança para esta pasta consiste em:

* `/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs/logoali.conf`
* `/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs/server.crt`
* `/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs/server.csr`
* `/home/daniel-rodrigues/Área de trabalho/logo-ali-project/certs/server.key`

---

### 4. Configuração e Ativação do Modo Dual-Protocol no Nginx

Com os arquivos de certificados devidamente posicionados e compartilhados na pasta raiz do projeto, proceda com a migração e acoplamento dos arquivos de configuração para os diretórios universais do sistema operacional.

**A. Preparar Diretório Universal de Certificados:**

```bash
sudo mkdir -p /etc/nginx/logoali-certs/
# Copie os arquivos compartilhados da pasta local para a pasta universal do Nginx
sudo cp ./certs/server.crt /etc/nginx/logoali-certs/
sudo cp ./certs/server.key /etc/nginx/logoali-certs/

```

**B. Migração e Ativação do Arquivo de Configuração do Nginx:**
Copie o arquivo de mapeamento de portas (`logoali.conf`) para o diretório de sites disponíveis do Nginx e crie o link simbólico para ativação:

```bash
sudo cp ./certs/logoali.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/logoali.conf /etc/nginx/sites-enabled/

```

**C. Validação da Sintaxe do Servidor e Reinicialização:**
Execute o teste de integridade para certificar que o Nginx reconheceu com sucesso os caminhos dos certificados e as diretivas de porta:

```bash
sudo nginx -t

```

*O retorno esperado no terminal deve obrigatoriamente indicar: `syntax is ok` e `test is successful`.*

Se a sintaxe estiver correta, reinicie o serviço do Nginx para aplicar as regras de isolamento de tráfego:

```bash
sudo systemctl restart nginx

```

---

### 5. Configuração do Stripe

Como o sistema utiliza o Stripe para o fluxo de checkout, é necessário gerar uma chave de teste:

1. Acesse o [Dashboard do Stripe](https://dashboard.stripe.com/register) e crie uma conta (gratuita).
2. No menu superior, certifique-se de que a opção **"Test Mode"** está ativada.
3. Vá em **Developers > API Keys**.
4. Copie a **Publishable key** (começa com `pk_test_`) e a **Secret key** (começa com `sk_test_`).

### 6. Configuração do Arquivo `.env`

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

### 7. Banco de Dados e Build

```bash
python manage.py migrate
python manage.py createsuperuser  

cd ../frontend
npm install && npm run build

```

---

# Execução do Sistema

Com o ambiente virtual ativado na pasta `logo-ali-app`, inicie o servidor backend:

```bash
python manage.py runserver

```

**Acesso via Proxy Seguro (Nginx):**

* **Navegação Comum:** http://localhost (Porta 80)
* **Navegação Sensível:** O sistema redirecionará automaticamente para https://localhost (Porta 443) ao acessar rotas de Login ou Cadastro.

> **Nota para Testes de Pagamento:** Utilize os números de [cartões de teste oficiais do Stripe](https://docs.stripe.com/testing) (Ex.: `4242 4242 4242 4242`).

---

# Funcionalidades para Análise de Auditoria

Durante o processo de auditoria cruzada, o grupo avaliador deve focar a análise nos seguintes mecanismos de segurança implementados:

* **ProtocolEnforcerMiddleware**: Localizado em `estacionamento/middleware.py`. É a "Portaria" de segurança que gerencia em nível de aplicação a transição dinâmica HTTP/HTTPS. Ele inspeciona a requisição e valida se o endpoint acessado coincide com o array de rotas protegidas:
`secure_routes = ['login', 'cadastro', 'admin', 'clientes', 'veiculo', 'pagamento', 'dashboard', 'historico', 'adicionar']`
Caso o acesso seja feito via HTTP comum nestas rotas, o middleware bloqueia a execução da View e emite um `HttpResponseRedirect` forçando a elevação do canal para HTTPS.
* **Dual-Block Nginx**: Configuração contida em `logoali.conf` que efetua a separação física de escuta em portas de rede, tratando o tráfego comum (Porta 80) e o tráfego encriptado (Porta 443) com terminação SSL dedicada e cifras criptográficas de alto nível (`HIGH:!aNULL:!MD5`).
* **HSTS & Hard Redirects**: Injeção de cabeçalhos de controle restritos (`Strict-Transport-Security`, `Cache-Control="no-store, no-cache"`, `Pragma="no-cache"`) para mitigar ataques de personificação ou reaproveitamento de sessões em cache local.
* **QR Code Dinâmico**: Geração de tokens de acesso únicos na portaria vinculados diretamente ao sucesso da confirmação de webhook do pagamento via Stripe.

---

# Monitoramento de Logs em Tempo Real

Para validar se o ecossistema está operando corretamente em modo seguro, monitore o terminal de execução do Django. O sucesso do "salto" físico de protocolo é evidenciado pela sequência de logs emitidos pela classe de controle:

```
[AUDITORIA] 2026-05-15 18:54:30,805 | INFO | "GET /login/ HTTP/1.0" 302 0
PORTARIA -> Path: /login/ | HTTPS: False | X-Forwarded-Proto: http | Needs HTTPS: True

[AUDITORIA] 2026-05-15 18:54:49,416 | INFO | "GET /login/ HTTP/1.0" 200 559
PORTARIA -> Path: /login/ | HTTPS: True | X-Forwarded-Proto: https | Needs HTTPS: True

```

*Nota: O código de status HTTP 302 (Redirecionamento temporário) seguido do código 200 (OK) já trafegando sob a flag `HTTPS: True` atesta a eficácia operacional do barramento.*

---

# Autor

**Daniel Rodrigues Pereira**
Acadêmico de **Sistemas de Informação**.
