import Alunos from "../screens/Alunos";
import Configuracoes from "../screens/Configuracoes";
import HistoricoPagamento from "../screens/HistoricoPagamento/HistoricoPagamento";
import Mensalidade from "../screens/Mensalidade";
import MeusDados from "../screens/MeusDados";
import Pagamentos from "../screens/Pagamentos";

export default routes = [
    {
        name: 'historico_pagamentos',
        label: 'Histórico Pagamentos',
        iconName: 'clipboard-text-clock-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: false,
        rigthButtonHeader: 'sync',
        component: HistoricoPagamento
    },
    {
        name: 'mensalidade',
        label: 'Mensalidade',
        iconName: 'currency-usd',
        isMainRoute: true,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: true,
        rigthButtonHeader: 'sync',
        component: Mensalidade
    },
    {
        name: 'meus_dados',
        label: 'Meus Dados',
        iconName: 'card-account-details-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: false,
        rigthButtonHeader: 'sync',
        component: MeusDados
    },
    {
        name: 'configuracoes',
        label: 'Configurações',
        iconName: 'cog-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: false,
        rigthButtonHeader: 'sync',
        component: Configuracoes
    },
    {
        name: 'pagamentos',
        label: 'Pagamentos',
        iconName: 'receipt', //receipt-text-check-outline,
        isMainRoute: true,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: false,
        rigthButtonHeader: 'sync',
        component: Pagamentos
    },
    {
        name: 'alunos',
        label: 'Alunos',
        iconName: 'card-account-details-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: false,
        rigthButtonHeader: 'sync',
        component: Alunos
    },
]
