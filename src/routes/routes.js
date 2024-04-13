import Alunos from "../screens/Alunos/Alunos";
import Parametros from "../screens/Parametros/Parametros";
import Faculdade from "../screens/Faculdade/Faculdade";
import HistoricoPagamento from "../screens/HistoricoPagamento/HistoricoPagamento";
import Mensalidade from "../screens/Mensalidade/Mensalidade";
import Inicio from "../screens/Inicio/Inicio";
import MeusDados from "../screens/MeusDados/MeusDados";
import Pagamentos from "../screens/Pagamentos/Pagamentos";
import IaChat from "../screens/IaChat";
import Cursos from "../screens/Cursos/Cursos";

export default routes = [
    {
        name: 'inicio',
        label: 'Inicio',
        accessRequired: ['ACESSO_ADMIN', 'ACESSO_GESTAO', 'ACESSO_ALUNO'],
        rigthButtonHeader: 'sync',
        component: Inicio,
        isInitialRoute: false,
    },
    {
        name: 'ia-chat',
        label: 'IA Chat',
        accessRequired: ['ACESSO_ADMIN', 'ACESSO_GESTAO', 'ACESSO_ALUNO'],
        rigthButtonHeader: 'sync',
        component: IaChat,
        isInitialRoute: false,
    },
    {
        name: 'historico-pagamentos',
        label: 'Histórico Pagamentos',
        accessRequired: ['ACESSO_ALUNO'],
        rigthButtonHeader: 'sync',
        component: HistoricoPagamento
    },
    {
        name: 'mensalidade',
        label: 'Mensalidade',
        accessRequired: ['ACESSO_ALUNO'],
        rigthButtonHeader: 'sync',
        component: Mensalidade
    },
    {
        name: 'meus-dados',
        label: 'Meus Dados',
        accessRequired: ['ACESSO_ALUNO'],
        rigthButtonHeader: 'sync',
        component: MeusDados
    },
    {
        name: 'parametros',
        label: 'Parâmetros',
        accessRequired: ['ACESSO_GESTAO'],
        rigthButtonHeader: 'sync',
        component: Parametros
    },
    {
        name: 'pagamentos',
        label: 'Pagamentos',
        accessRequired: ['ACESSO_GESTAO'],
        rigthButtonHeader: 'sync',
        component: Pagamentos
    },
    {
        name: 'alunos',
        label: 'Alunos',
        accessRequired: ['ACESSO_GESTAO'],
        rigthButtonHeader: 'sync',
        component: Alunos
    },
    {
        name: 'faculdades',
        label: 'Faculdades',
        accessRequired: ['ACESSO_GESTAO'],
        rigthButtonHeader: 'sync',
        component: Faculdade
    },
    {
        name: 'cursos',
        label: 'Cursos',
        accessRequired: ['ACESSO_GESTAO'],
        rigthButtonHeader: 'sync',
        component: Cursos
    },
]
