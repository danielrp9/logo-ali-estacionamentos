/**
 * Logo Ali Estacionamentos - Dados da Política de Segurança da Informação (PSI)
 * Arquivo de conteúdo isolado para fácil manutenção.
 */

export const psiContent = {
  title: "Política de Segurança da Informação (PSI) - Logo Ali Estacionamentos",
  metadata: {
    institution: "Logo Ali Estacionamentos",
    location: "Diamantina - MG",
    year: "2026",
    course: "Segurança e Auditoria de Sistemas de Informação",
    professor: "Eduardo Peli",
    authors: [
      "Alvaro Patrocínio Leite Soares",
      "Bernardo Ivo de Oliveira",
      "Daniel Rodrigues Pereira",
      "Gabriel Moreira Siqueira",
      "João Vitor Pinheiro",
      "Thais Daniela da Silva Rosa"
    ],
    versionControl: {
      title: "Controle de Versão do Documento",
      description: "Tabela 01: Controle de Versões",
      headers: ["Versão", "Data", "Descrição", "Responsável"],
      rows: [
        { version: "1.0", date: "16/03/2026", description: "Fase inicial da Política", responsible: "Grupo D" },
        { version: "2.0", date: "15/05/2026", description: "Reestruturação da Política com base na implementação do sistema", responsible: "Grupo D" }
      ]
    },
    summary: {
      title: "Resumo",
      text: "Este documento apresenta a Política de Segurança da Informação desenvolvida para a empresa fictícia Logo Ali Estacionamentos, com o objetivo de estabelecer diretrizes e boas práticas para a proteção das informações e dos recursos tecnológicos da organização. A política define regras relacionadas ao uso adequado dos sistemas, controle de acesso, responsabilidades dos usuários, gestão de incidentes de segurança e medidas disciplinares em caso de descumprimento das normas estabelecidas. O documento aplica-se a todos os colaboradores, estagiários e terceiros que utilizam recursos tecnológicos da empresa. A implementação desta política busca garantir a confidencialidade, integridade e disponibilidade das informações, contribuindo para a redução de riscos e para o fortalecimento da cultura de segurança dentro da organização.",
      keywords: ["Segurança da Informação", "Política de Segurança", "Controle de Acesso"]
    }
  },
  introduction: {
    title: "1. Introdução",
    text: "Este trabalho tem como objetivo desenvolver uma Política de Segurança da Informação (PSI) para a empresa Logo Ali Estacionamentos, que atua no ramo de estacionamento de veículos. O projeto analisa as características da empresa, seus riscos, vulnerabilidades e define diretrizes, normas e procedimentos para garantir a segurança das informações e das operações da organização. A PSI estabelece diretrizes para a proteção dos dados e dos sistemas, garantindo a confidencialidade, integridade e disponibilidade das informações. Esta política aplica-se a todos os usuários do sistema, incluindo clientes e administradores, visando assegurar o uso adequado e seguro da plataforma."
  },
  sections: [
    {
      title: "2. Objetivo",
      text: "O objetivo desta política é definir regras e mecanismos de segurança que assegurem a proteção das informações trafegadas e armazenadas no sistema, prevenindo acessos não autorizados, vazamentos de dados e falhas de integridade através de tecnologias de certificação, estabelecendo diretrizes, normas e boas práticas para a proteção dos ativos de informação e redução de riscos operacionais."
    },
    {
      title: "3. Escopo de Aplicação",
      text: "Esta Política de Segurança da Informação aplica-se a todos os usuários que utilizam ou possuem acesso aos recursos tecnológicos da empresa Logo Ali Estacionamentos. O escopo abrange todos os ativos de informação listados a seguir:",
      bullets: [
        "Usuários abrangidos: Funcionários, Administradores do sistema, Clientes e Prestadores de serviço ou terceiros autorizados.",
        "Dados Pessoais: Informações cadastrais de clientes, documentos, contatos e credenciais de autenticação (login e senha).",
        "Registros Operacionais: Histórico de veículos, registros de entrada, permanência e saída de automóveis, além de dados financeiros do estacionamento.",
        "Ativos de Infraestrutura: Sistemas informatizados, banco de dados, computadores, equipamentos da guarita e canais de comunicação integral entre cliente e servidor.",
        "Bens sob custódia: Veículos estacionados e chaves sob guarda da empresa."
      ]
    },
    {
      title: "4. Responsabilidades",
      text: "A segurança da informação é um esforço conjunto que envolve diferentes níveis da organização. Ficam definidas as seguintes responsabilidades:",
      subsections: [
        {
          title: "4.1 Responsabilidades da Empresa",
          bullets: [
            "Definir e manter atualizada a Política de Segurança da Informação;",
            "Garantir que os colaboradores tenham pleno conhecimento das regras de segurança;",
            "Manter os sistemas e equipamentos tecnológicos devidamente atualizados e protegidos;",
            "Implementar mecanismos robustos de backup e proteção de dados;",
            "Monitorar ativamente possíveis incidentes de segurança."
          ]
        },
        {
          title: "4.2 Responsabilidade dos Funcionários",
          bullets: [
            "Utilizar os sistemas corporativos exclusivamente para fins relacionados ao trabalho;",
            "Manter sigilo absoluto sobre informações de clientes e operações do estacionamento;",
            "Não compartilhar, sob nenhuma hipótese, credenciais ou senhas de acesso ao sistema;",
            "Informar imediatamente à administração qualquer incidente, anomalia ou comportamento suspeito no sistema;",
            "Zelar pela integridade física e operacional dos equipamentos utilizados no ambiente de trabalho."
          ]
        },
        {
          title: "4.3 Responsabilidade do Administrador do System",
          bullets: [
            "Gerenciar de forma estrita as contas de usuários e seus respectivos níveis de acesso;",
            "Monitorar logs de auditoria e atividades globais do sistema;",
            "Garantir a execução e a integridade dos backups periódicos do banco de dados;",
            "Aplicar tempestivamente correções e atualizações de segurança no ecossistema técnico;",
            "Liderar e auxiliar na investigação de possíveis incidentes de segurança."
          ]
        }
      ]
    },
    {
      title: "5. Diretrizes de Segurança",
      text: "As diretrizes de Segurança da Informação estabelecem os princípios gerais para garantir a confidencialidade, integridade e disponibilidade das informações corporativas:",
      bullets: [
        "Controle de Acesso às Informações: O acesso aos sistemas deve ser restrito a usuários autorizados segundo suas funções, exigindo credenciais individuais.",
        "Proteção dos Dados de Clientes e Veículos: Informações cadastrais e registros operacionais devem ser tratados confidencialmente para fins estritamente necessários à operação.",
        "Segurança dos Sistemas e Banco de Dados: Uso mandatório de mecanismos de autenticação, controle de acesso e logs para garantir a rastreabilidade.",
        "Backup e Recuperação de Dados: Execução regular de cópias de segurança para salvaguardar a operação contra falhas ou desastres.",
        "Proteção dos Equipamentos Tecnológicos: Computadores e sistemas de controle devem possuir ferramentas de proteção e uso restrito às atividades da empresa.",
        "Atualização e Manutenção de Sistemas: Softwares devem receber correções periódicas contra vulnerabilidades identificadas.",
        "Uso Adequado dos Recursos: Proibição de atividades digitais que ponham em risco a infraestrutura tecnológica ou a reputação da organização.",
        "Monitoramento e Auditoria: Registro sistemático de atividades de rede e sistema para prevenção e apuração de incidentes.",
        "Tratamento de Incidentes: Resposta rápida e notificação imediata à administração diante de qualquer anomalia de segurança.",
        "Proteção de Registros Financeiros e Operacionais: Bloqueio contra adulterações ou exclusões indevidas de dados críticos."
      ]
    },
    {
      title: "6. Definições e Nichos de Segurança",
      text: "Conforme as diretrizes de organização por nichos, a segurança da arquitetura do sistema é definida pelos seguintes componentes técnicos e de controle de acesso:",
      bullets: [
        "Certificação Digital: Conjunto de técnicas que utiliza chaves públicas para identificar de forma inequívoca o servidor da organização através de autoridades confiáveis.",
        "Chave Pública e Privada: Par de chaves criptográficas onde a chave pública é distribuída via certificado para cifragem e a privada é mantida em sigilo estrito pelo servidor para decifragem.",
        "Criptografia de Fluxo (TLS/SSL): Protocolo que utiliza a certificação digital para cifrar a comunicação de ponta a ponta entre o navegador do usuário e o servidor.",
        "Autenticação e Níveis de Permissão: Validação da identidade do usuário com base no princípio do menor privilégio para restringir funcionalidades críticas.",
        "Nicho N08.6 (Proteção de Dados): Exigência de transmissão criptografada em ambiente seguro validado por certificados digitais para dados sensíveis.",
        "Nicho N07.1 (Controle de Acesso): Uso de credenciais individuais exclusivas e proibição de compartilhamento de sessões em áreas restritas.",
        "Nicho N02.1 (Comunicação Segura e Certificação): Aplicação do protocolo TLS/SSL para impedir a interceptação e adulteração de pacotes de dados por agentes maliciosos."
      ]
    },
    {
      title: "7. Classificação da Informação",
      text: "As informações da empresa são classificadas de acordo com seu nível de sensibilidade e o impacto decorrente de uma divulgação não autorizada:",
      table: {
        headers: ["Tipo de Informação", "Classificação", "Descrição"],
        rows: [
          { type: "Dados cadastrais de clientes", classification: "Confidencial", description: "Informações pessoais protegidas contra acesso não autorizado de acordo com a LGPD." },
          { type: "Histórico de pagamentos", classification: "Confidencial", description: "Dados financeiros sensíveis que não podem ser expostos publicamente." },
          { type: "Registros operacionais de veículos", classification: "Interno", description: "Informações de fluxo utilizadas exclusivamente no dia a dia do estacionamento." },
          { type: "Informações institucionais da empresa", classification: "Público", description: "Dados de divulgação livre que não trazem riscos ao negócio." }
        ]
      }
    },
    {
      title: "8. Normas de Segurança da Informação",
      text: "Normas obrigatórias aplicadas aos recursos tecnológicos. O descumprimento sujeita o infrator às penalidades previstas nesta política.",
      subsections: [
        {
          title: "8.1 Normas de Controle de Acesso",
          bullets: [
            "N01.1 Cada usuário do sistema deverá possuir credenciais de acesso individuais e intransferíveis. O compartilhamento de login entre usuários é expressamente proibido.",
            "N01.2 O cadastro de novos usuários pode ser realizado pelo próprio cliente de forma independente, conferindo privilégios exclusivos para incluir veículo, realizar pagamentos e consultar seu histórico.",
            "N01.3 Somente o perfil de Administrador possui permissão para alterar o nível de acesso de um Usuário Comum/Cliente para o perfil de Funcionário.",
            "N01.4 Os perfis de acesso deverão respeitar o princípio do menor privilégio, limitando as funções de Cliente (cadastro, consultas e pagamentos), Funcionário (registro de fluxos operacionais de entrada/saída) e Administrador (gestão total do sistema, logs e relatórios financeiros).",
            "N01.5 A liberação e retirada de veículos do pátio físico poderão ser executadas somente por usuários autenticados e com nível de permissão adequado.",
            "N01.6 Qualquer usuário (Cliente, Funcionário ou Administrador) tem permissão para efetuar o pagamento digital por meio de seu próprio dispositivo eletrônico.",
            "N01.7 Em caso de desligamento, afastamento ou rescisão contratual, o Administrador deverá desativar as credenciais de acesso do colaborador no prazo máximo improrrogável de 24 horas.",
            "N01.8 O acesso direto ao banco de dados em ambiente de produção é restrito ao Administrador do Sistema e somente permitido em situações devidamente justificadas e documentadas."
          ]
        },
        {
          title: "8.2 Normas de Gestão de Senhas",
          bullets: [
            "N02.1 As senhas de acesso ao sistema deverão conter no mínimo 8 (oito) caracteres, combinando obrigatoriamente letras maiúsculas, letras minúsculas e números.",
            "N02.2 As senhas são de uso pessoal e intransferível. É expressamente proibido comunicar, anotar em locais visíveis ou compartilhar senhas com colegas de trabalho.",
            "N02.3 O sistema deverá realizar o bloqueio temporário da conta após 5 (cinco) tentativas consecutivas de login malsucedidas. O desbloqueio dependerá da intervenção do Administrador do Sistema.",
            "N02.4 Recomenda-se a alteração periódica de senhas, estabelecendo-se um intervalo máximo de segurança de 90 (noventa) dias.",
            "N02.5 Em caso de suspeita ou confirmação de comprometimento de uma credencial, o usuário deve acionar imediatamente o Administrador do Sistema para a troca da senha."
          ]
        },
        {
          title: "8.3 Normas de Proteção de Dados (Conformidade LGPD)",
          bullets: [
            "N03.1 Os dados pessoais armazenados (nome, documentos, contatos e placas) deverão ser tratados em estrita conformidade com os princípios legais da LGPD (finalidade, necessidade, segurança e confidencialidade).",
            "N03.2 É expressamente proibida a divulgação, compartilhamento ou comercialização de dados de clientes e veículos a terceiros sem a autorização formal do Gestor.",
            "N03.3 É vedada a cópia, exportação ou transferência de dados cadastrais para dispositivos pessoais dos funcionários, como celulares particulares, pen drives ou contas de nuvem privadas.",
            "N03.4 O acesso a dados cadastrais completos de clientes é restrito ao Administrador. Funcionários operadores visualizam apenas dados estritamente necessários para o atendimento.",
            "N03.5 Em situações de suspeita de vazamento de dados, a empresa adotará as medidas previstas na LGPD, incluindo a notificação estruturada à ANPD (Autoridade Nacional de Proteção de Dados).",
            "N03.6 Os registros financeiros e fluxos de caixa são dados sensíveis do negócio e não podem sofrer exclusão ou alteração por usuários de perfil Funcionário ou Cliente."
          ]
        },
        {
          title: "8.4 Normas de Uso dos Sistemas e Recursos Tecnológicos",
          bullets: [
            "N04.1 Os equipamentos e sistemas corporativos destinam-se unicamente ao desempenho de funções profissionais da empresa, sendo vedado o uso para fins pessoais.",
            "N04.2 É estritamente proibido o uso dos terminais para redes sociais, streaming, download de arquivos não homologados ou instalação de softwares sem validação prévia do Administrador.",
            "N04.3 O terminal de operação localizado na guarita não deve ser deixado sem supervisão com uma sessão ativa. Ao se ausentar, o operador deve bloquear a estação.",
            "N04.4 Clientes e visitantes não possuem permissão de acesso físico ou visual direto ao terminal operacional localizado na guarita sob nenhuma circunstância.",
            "N04.5 Mídias de armazenamento externo (pen drives, HDs externos) só podem ser conectadas aos computadores da empresa com autorização expressa por escrito do Administrador.",
            "N04.6 A navegação na internet nos terminais de trabalho será limitada pelo Administrador do Sistema aos domínios estritamente necessários à operação do estacionamento."
          ]
        },
        {
          title: "8.5 Normas de Segurança Física e do Ambiente",
          bullets: [
            "N05.1 O espaço físico da guarita e das áreas administrativas é de acesso restrito a funcionários devidamente escalados e autorizados.",
            "N05.2 Todos os colaboradores em serviço devem portar obrigatoriamente identificação visual visível (crachá e uniforme padrão) para diferenciação imediata no pátio.",
            "N05.3 O Circuito Fechado de TV (CFTV) deve cobrir as zonas críticas e de circulação, mitigando pontos cegos. A manutenção preventiva do sistema é de responsabilidade do Gestor.",
            "N05.4 A cancela eletrônica automatizada de controle de fluxo de veículos passará por revisões periódicas. Eventuais anomalias físicas devem ser comunicadas imediatamente ao Gestor.",
            "N05.5 Chaves de veículos sob custódia da empresa devem permanecer em claviculário físico seguro, trancado, com acesso restrito e rastreabilidade manual de retirada.",
            "N05.6 A infraestrutura de iluminação do pátio deve ser inspecionada para garantir condições ideais de visibilidade e segurança nos períodos vespertino e noturno.",
            "N05.7 Na ocorrência de colapso nos sistemas eletrônicos ou falta de energia, os funcionários devem adotar imediatamente o procedimento operacional de plano manual de registro."
          ]
        },
        {
          title: "8.6 Normas de Backup e Recuperação de Dados",
          bullets: [
            "N06.1 O sistema deverá rodar rotinas automáticas de backup do banco de dados relacional com periodicidade mínima diária, executadas preferencialmente fora do horário de pico.",
            "N06.2 O backup abrangerá obrigatoriamente o cadastro de clientes, dados de veículos, histórico financeiro de pagamentos e logs de auditoria do sistema.",
            "N06.3 As mídias e arquivos de backup serão armazenados em ambiente logicamente isolado do servidor principal, utilizando-se armazenamento em nuvem criptografado ou mídias físicas seguras.",
            "N06.4 O Administrador do Sistema realizará testes práticos de restauração (restore) mensais para atestar a integridade dos snapshots, documentando os resultados.",
            "N06.5 Diante de falhas reportadas nas rotinas automáticas de backup, o Administrador deve ser acionado para conduzir o procedimento de geração manual de segurança.",
            "N06.6 Antes de qualquer deploy, atualização de código ou manutenção estrutural no banco de dados em produção, é obrigatória a extração de um backup completo preventivo."
          ]
        },
        {
          title: "8.7 Normas de Monitoramento e Registro de Logs",
          bullets: [
            "N07.1 O sistema gerará registros automáticos (logs) detalhando: acessos ao sistema, inclusão/alteração de veículos, pagamentos, modificações cadastrais e erros de login.",
            "N07.2 Cada entrada de log registrará minimamente: timestamp UTC, identificador único do usuário (ID/Login), IP de origem e a descrição precisa da query ou ação realizada.",
            "N07.3 Os logs de auditoria serão retidos de forma íntegra por um período mínimo de 90 (noventa) dias, protegidos contra deleção por qualquer nível de acesso comum.",
            "N07.4 O Administrador inspecionará os logs semanalmente buscando comportamentos anômalos, acessos fora de horário comercial ou volumes atípicos de requisições.",
            "N07.5 Os logs estarão disponíveis para o Gestor e auditores autorizados a qualquer tempo para fins de conformidade ou perícia técnica.",
            "N07.6 Todo usuário manifesta consentimento ativo sobre o monitoramento de suas ações de navegação e operação no sistema ao realizar o primeiro acesso à plataforma."
          ]
        },
        {
          title: "8.8 Normas de Manutenção e Atualização de Sistemas",
          bullets: [
            "N08.1 O ecossistema técnico baseado no framework Django, bibliotecas e dependências correlatas devem ser atualizados. Patches críticos de segurança exigem aplicação em até 15 dias.",
            "N08.2 O sistema operacional do servidor central e das estações de trabalho deve receber atualizações e correções de segurança de forma automatizada e monitorada.",
            "N08.3 Os terminais operacionais manterão ferramentas de antivírus/anti-malware ativas e com atualizações de definições em tempo real.",
            "N08.4 O Administrador do Sistema acompanhará boletins de segurança e exploits conhecidos (CVEs) relacionados às tecnologias do projeto para mitigação preventiva.",
            "N08.5 A instalação de aplicações de terceiros nos computadores corporativos depende de homologação prévia. Softwares não autorizados serão purgados imediatamente.",
            "N08.6 O sistema operará em regime dual controlado: páginas estáticas públicas podem trafegar em HTTP, porém caminhos com dados sensíveis, autenticação e finanças exigem HTTPS de forma mandatória."
          ]
        },
        {
          title: "8.9 Normas de Resposta a Incidentes de Segurança",
          bullets: [
            "N09.1 Qualquer anomalia ou quebra de segurança deve ser reportada ao Administrador e ao Gestor em um teto máximo de 2 (duas) horas após a detecção.",
            "N09.2 Caracterizam-se incidentes: invasões, vazamento de registros, indisponibilidade prolongada, erros severos no processamento de pagamentos ou adulterações de banco de dados.",
            "N09.3 Todo incidente gerará um Registro de Incidente detalhando o escopo da falha, sistemas afetados, cronologia dos fatos, ações corretivas emergenciais e responsáveis.",
            "N09.4 O fluxo de resposta seguirá estritamente a ordem: Identificação/Confirmação, Contenção de danos, Registro da ocorrência, Comunicação à Gestão, Erradicação/Correção e Aprendizado/Análise de causa raiz.",
            "N09.5 Incidentes envolvendo vazamento de dados de pessoas físicas deflagrarão o comitê de crise para cumprimento dos prazos legais de reporte à ANPD e titulares.",
            "N09.6 A resolução do incidente será consolidada em um Relatório Técnico Final com propostas estruturais para blindagem do ambiente e prevenção de novos cenários análogos."
          ]
        },
        {
          title: "8.10 Normas Disciplinares",
          bullets: [
            "N10.1 A inobservância das normas contidas nesta PSI sujeitará o colaborador responsável a penalidades progressivas: Advertência verbal, Advertência formal por escrito, Suspensão temporária de acessos, Desligamento por justa causa (conforme CLT) e Responsabilização civil/criminal.",
            "N10.2 A dosimetria e aplicação das sanções cabem ao Gestor da organização, subsidiado pelos relatórios técnicos emitidos pelo Administrador do Sistema.",
            "N10.3 O processo administrativo de apuração de conduta será integralmente documentado e arquivado junto ao histórico do colaborador.",
            "N10.4 Todos os usuários abrangidos assinarão um Termo de Ciência e Conformidade (ou aceite digital obrigatório no primeiro login) atestando concordância com as regras da PSI."
          ]
        }
      ]
    },
    {
      title: "9. Aplicação Prática e Procedimentos de Segurança",
      text: "Os procedimentos descrevem a rotina operacionalizada do sistema, integrando as regras da PSI com a arquitetura de software (Django/TLS):",
      subsections: [
        {
          title: "9.1 Procedimento para Criação de Usuários no Sistema",
          text: "Os usuários realizam o autocadastro preenchendo e-mail, CPF, nome e endereço. Por padrão, entram no grupo de permissões de Cliente. O Administrador do Sistema revisa e altera manualmente as credenciais para o grupo de Funcionários quando houver a contratação de operadores."
        },
        {
          title: "9.2 Procedimento para Desativação de Usuários",
          text: "Após comunicação do Gestor sobre o desligamento de um colaborador, o Administrador localiza o cadastro no painel administrativo e altera o status da conta para 'Inativo' (is_active=False no Django), bloqueando o login nas plataformas em até 24 horas."
        },
        {
          title: "9.3 Procedimento de Backup de Dados",
          text: "O crontab do servidor dispara diariamente snapshots automatizados após o encerramento das atividades. Os dumps criptografados são direcionados ao bucket na nuvem. Mensalmente, o Administrador realiza um restore em ambiente de homologação para checar a consistência dos dados."
        },
        {
          title: "9.4 Procedimento de Monitoramento de Logs",
          text: "O Administrador do Sistema acessa o painel de auditoria semanalmente analisando picos de erros de autenticação (401/403) ou chamadas de API atípicas. Atividades maliciosas geram abertura de chamados técnicos de contenção."
        },
        {
          title: "9.5 Procedimento de Resposta a Incidentes de Segurança",
          text: "Ao detectar uma invasão ou vazamento, o operador notifica o administrador. O IP atacante é bloqueado via firewall corporativo. O incidente é registrado no histórico, o sistema é corrigido e um relatório conclusivo é submetido à diretoria."
        },
        {
          title: "9.6 Procedimento de Atualização de Sistemas",
          text: "O Administrador roda checagens de dependências quinzenalmente. Antes do upgrade em produção, gera um backup completo. As atualizações são aplicadas primeiro em ambiente de testes e homologadas antes do deploy definitivo."
        },
        {
          title: "9.7 Procedimento Operacional para Registro de Veículos (Plano Manual de Contingência)",
          text: "Em caso de indisponibilidade de energia ou sistema, o operador utiliza blocos físicos de papel anotando: Data, Hora, Placa e Nome. Um canhoto é entregue ao cliente. Após o retorno do sistema, o operador digita todas as contingências manuais no sistema eletrônico para regularizar o banco de dados."
        }
      ]
    },
    {
      title: "10. Aprovação, Vigência e Disposições Finais",
      text: "Esta Política de Segurança da Informação entra em vigor imediatamente após sua homologação pela direção da Logo Ali Estacionamentos, possuindo validade pública e transparente através de exibição na página institucional. O documento passará por revisões anuais ou sempre que houver mudanças estruturais na arquitetura tecnológica da empresa."
    }
  ]
};