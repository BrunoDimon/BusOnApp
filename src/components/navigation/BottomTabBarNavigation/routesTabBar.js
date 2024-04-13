export default routesTabBar = [
    {
        tipoAcesso: 'ACESSO_ADMIN',
        routes: [
            /*            {
                           name: 'pagamentos',
                           label: 'Pagamentos',
                           iconName: 'receipt',
                           isMainRoute: false,
                       }, */
            {
                name: 'inicio',
                label: 'Início',
                iconName: 'home-outline',
                isMainRoute: true,
            },
            /*             {
                            name: 'alunos',
                            label: 'Alunos',
                            iconName: 'card-account-details-outline',
                            isMainRoute: false,
                        } */
        ]
    },
    {
        tipoAcesso: 'ACESSO_GESTAO',
        routes: [
            {
                name: 'pagamentos',
                label: 'Pagamentos',
                iconName: 'receipt',
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
        tipoAcesso: 'ACESSO_ALUNO',
        routes: [
            {
                name: 'historico-pagamentos',
                label: 'Histórico Pagamentos',
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
                name: 'mensalidade',
                label: 'Mensalidade',
                iconName: 'currency-usd',
                isMainRoute: false,
            }
        ]
    }

]