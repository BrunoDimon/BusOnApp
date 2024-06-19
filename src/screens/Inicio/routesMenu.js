
export default routesMenu = [
    {
        category: 'IA',
        routes: [
            {
                name: 'ia-chat',
                accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
            },
            {
                name: 'ia-chat',
                label: 'IA Chat',
                iconName: 'robot-outline',
                accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
            },
            {
                name: 'ia-chat',
                accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
            },
        ]
    },
    {
        category: 'Aluno',
        routes: [
            {
                name: 'meus-dados',
                label: 'Meus Dados',
                iconName: 'card-account-details-outline',
                accessRequired: ['ALUNO'],
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
                accessRequired: ['GESTAO'],
            },
            {
                name: 'instituicoes',
                label: 'Instituições',
                iconName: 'town-hall',
                accessRequired: ['GESTAO'],
            },
            {
                name: 'cursos',
                label: 'Cursos',
                iconName: 'school-outline',
                accessRequired: ['GESTAO'],
            },
            {
                name: 'parametros',
                label: 'Parâmetros',
                iconName: 'content-save-cog-outline',
                accessRequired: ['GESTAO'],
            },

        ]
    },
    {
        category: 'Pagamentos',
        routes: [
            {
                name: 'pagamentos',
                label: 'Pagamentos',
                iconName: 'clipboard-text-clock-outline',
                accessRequired: ['GESTAO', 'ALUNO'],
            },
        ]
    },
    {
        category: 'Administração APP',
        routes: [
            {
                name: 'associacao',
                label: 'Associações',
                iconName: 'bus-multiple',
                accessRequired: ['ADMIN'],
            },
            {
                name: 'usuario',
                label: 'Usuários',
                iconName: 'account-group-outline',
                accessRequired: ['ADMIN'],
            },

        ]
    },
]