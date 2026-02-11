# WebMind IA Audit

Bem-vindo ao **WebMind IA Audit**, uma plataforma Enterprise moderna para auditoria de código, detecção de vulnerabilidades e análise de dívida técnica, impulsionada pela API do Google Gemini.

## 🚀 Sobre o Projeto

O WebMind IA Audit foi projetado para desenvolvedores e empresas que desejam manter a qualidade do seu software em alto nível. A aplicação permite conectar-se via GitHub, listar repositórios e realizar auditorias profundas assistidas por IA.

O sistema integra pagamentos via simulação de **Multicaixa Express**, permitindo cobrar por análises detalhadas ou correções automatizadas.

### ✨ Funcionalidades Principais

*   **Autenticação**: Login seguro via GitHub.
*   **Análise de Portfólio**: Visualização de todos os repositórios abertos (Públicos e Privados simulados).
*   **Auditoria IA (Gemini 3)**:
    *   Detecção de Vulnerabilidades de Segurança.
    *   Identificação de Code Smells e Bugs.
    *   Cálculo de Dívida Técnica e Duplicação.
    *   Gráficos Radar de Qualidade (Segurança, Manutenibilidade, Confiabilidade).
*   **Planos de Análise**:
    *   **Padrão (5.000 KZ)**: Relatório completo de vulnerabilidades.
    *   **Premium (8.000 KZ)**: Inclui sugestão de código (Fix) e refatoração automática.
*   **Pagamentos**: Integração visual com Multicaixa Express.
*   **Interface Premium**: Design responsivo, moderno e fluido inspirado nas melhores práticas de UX/UI (Instagram/X style), com suporte total a Mobile.
*   **Histórico e Faturas**: Acompanhamento de relatórios passados e gestão de pagamentos.

## 🛠 Tecnologias Utilizadas

Este projeto foi construído utilizando as tecnologias mais modernas do ecossistema React:

*   **React 19**: Biblioteca UI principal.
*   **TypeScript**: Para tipagem estática e segurança no código.
*   **Tailwind CSS**: Framework de estilização utility-first para um design rápido e responsivo.
*   **@google/genai**: SDK oficial para integração com os modelos Gemini 3 Flash/Pro.
*   **Lucide React**: Biblioteca de ícones leve e consistente.
*   **Recharts**: Biblioteca de gráficos composavel para visualização de dados.

## 📦 Instalação e Execução

Este projeto não requer um servidor backend complexo para demonstração, pois utiliza a API do Gemini diretamente no cliente (com as devidas precauções de segurança para produção real).

1.  **Clone o repositório** (se aplicável).
2.  **Configuração da API Key**:
    *   O projeto espera que a chave da API do Google Gemini esteja disponível em `process.env.API_KEY`.
    *   Certifique-se de que o ambiente de execução injeta essa variável.

3.  **Executar**:
    *   O projeto está configurado para rodar em ambientes modernos de frontend (como Vite ou StackBlitz).
    *   Simplesmente inicie o servidor de desenvolvimento.

## 📱 Responsividade

O WebMind IA Audit é totalmente responsivo:
*   **Desktop**: Sidebar lateral fixa, tabelas expandidas, gráficos grandes.
*   **Mobile**: Menu "Drawer" (hambúrguer), tabelas convertidas em cartões (Cards), layouts adaptados para toque.

## 💰 Modelo de Negócio (Simulado)

O app simula um fluxo de monetização real em Kwanzas (KZ):
1.  Usuário seleciona um repositório.
2.  Escolhe entre plano **Basic** ou **Premium**.
3.  Confirma o pagamento via modal do Multicaixa Express.
4.  Recebe o relatório gerado pela IA.

---

Desenvolvido com ❤️ e IA.