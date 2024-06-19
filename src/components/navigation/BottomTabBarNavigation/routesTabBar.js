export default routesTabBar = [
    {
        tipoAcesso: 'ADMIN',
        routes: [
            {
                name: 'associacao',
                label: 'Associações',
                iconName: 'bus-multiple',
                isMainRoute: false,
            },
            {
                name: 'inicio',
                label: 'Início',
                iconName: 'home-outline',
                isMainRoute: true,
            },
            {
                name: 'usuario',
                label: 'Usuários',
                iconName: 'account-group-outline',
                isMainRoute: false,
            },
        ]
    },
    {
        tipoAcesso: 'GESTAO',
        routes: [
            {
                name: 'pagamentos',
                label: 'Pagamentos',
                iconName: 'clipboard-text-clock-outline',
                isMainRoute: false,
            },
            {
                name: 'inicio',
                label: 'Início',
                iconName: 'home-outline',
                isMainRoute: true,
            },
            {
                name: 'alunos',
                label: 'Alunos',
                iconName: 'card-account-details-outline',
                isMainRoute: false,
            }
        ]
    },
    {
        tipoAcesso: 'ALUNO',
        routes: [
            {
                name: 'pagamentos',
                label: 'Pagamentos',
                iconName: 'clipboard-text-clock-outline',
                isMainRoute: false,
            },
            {
                name: 'inicio',
                label: 'Início',
                iconName: 'home-outline',
                isMainRoute: true,
            },
            {
                name: 'meus-dados',
                label: 'Meus Dados',
                iconName: 'card-account-details-outline',
                isMainRoute: false,
            }
        ]
    }

]