
export default routesMenu = [
    {
        category: 'IA',
        routes: [
            {
                name: 'ia-chat',
                accessRequired: ['ACESSO_ADMIN', 'ACESSO_GESTAO', 'ACESSO_ALUNO'],
            },
            {
                name: 'ia-chat',
                label: 'IA Chat',
                iconName: 'robot-outline',
                accessRequired: ['ACESSO_ADMIN', 'ACESSO_GESTAO', 'ACESSO_ALUNO'],
            },
            {
                name: 'ia-chat',
                accessRequired: ['ACESSO_ADMIN', 'ACESSO_GESTAO', 'ACESSO_ALUNO'],
            },
        ]
    },
    {
        category: 'Aluno',
        routes: [
            {
                name: 'mensalidade',
                label: 'Mensalidade',
                iconName: 'currency-usd',
                accessRequired: ['ACESSO_ALUNO'],
            },
            {
                name: 'historico-pagamentos',
                label: 'Histórico',
                iconName: 'clipboard-text-clock-outline',
                accessRequired: ['ACESSO_ALUNO'],
            },
            {
                name: 'meus-dados',
                label: 'Meus Dados',
                iconName: 'card-account-details-outline',
                accessRequired: ['ACESSO_ALUNO'],
            },

        ]
    },
    {
        category: 'Associação',
        routes: [
            {
                name: 'alunos',
                label: 'Alunos',
                iconName: 'account-group-outline',
                accessRequired: ['ACESSO_GESTAO'],
            },
            {
                name: 'instituicoes',
                label: 'Instituições',
                iconName: 'town-hall',
                accessRequired: ['ACESSO_GESTAO'],
            },
            {
                name: 'cursos',
                label: 'Cursos',
                iconName: 'school-outline',
                accessRequired: ['ACESSO_GESTAO'],
            },
            {
                name: 'parametros',
                label: 'Parâmetros',
                iconName: 'content-save-cog-outline',
                accessRequired: ['ACESSO_GESTAO'],
            },
            {
                name: 'historico-pagamentos',
                label: 'Histórico de Pagamentos',
                iconName: 'content-save-cog-outline',
                accessRequired: ['ACESSO_GESTAO'],
            },

        ]
    },
]