import Usuario from "../screens/Usuarios/Usuario";
import Parametros from "../screens/Parametros/Parametros";
import HistoricoPagamento from "../screens/HistoricoPagamento/HistoricoPagamento";
import Mensalidade from "../screens/Mensalidade/Mensalidade";
import Inicio from "../screens/Inicio/Inicio";
import MeusDados from "../screens/MeusDados/MeusDados";
import Pagamentos from "../screens/Pagamentos/Pagamentos";
import IaChat from "../screens/IaChat/IaChat";
import Cursos from "../screens/Cursos/Cursos";
import Instituicao from "../screens/Instituicao/Instituicao";
import { Associacao } from "../screens/Associacao/Associacao";

export default routes = [
    {
        name: 'inicio',
        label: 'Inicio',
        accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
        rigthButtonHeader: 'sync',
        component: Inicio,
        isInitialRoute: false,
    },
    {
        name: 'ia-chat',
        label: 'IA Chat',
        accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
        leftButtonHeader: 'arrow-left',
        component: IaChat,
        isInitialRoute: false,
        hideTabBar: true,
    },
    {
        name: 'associacao',
        label: 'Associação',
        accessRequired: ['ADMIN'],
        rigthButtonHeader: 'sync',
        component: Associacao
    },
    {
        name: 'usuario',
        label: 'Usuários',
        accessRequired: ['ADMIN'],
        rigthButtonHeader: 'sync',
        component: Usuario
    },
    {
        name: 'historico-pagamentos',
        label: 'Histórico Pagamentos',
        accessRequired: ['ALUNO', 'GESTAO'],
        rigthButtonHeader: 'sync',
        component: HistoricoPagamento
    },
    {
        name: 'mensalidade',
        label: 'Mensalidade',
        accessRequired: ['ALUNO'],
        rigthButtonHeader: 'sync',
        component: Mensalidade
    },
    {
        name: 'meus-dados',
        label: 'Meus Dados',
        accessRequired: ['ALUNO'],
        rigthButtonHeader: 'sync',
        component: MeusDados
    },
    {
        name: 'parametros',
        label: 'Parâmetros',
        accessRequired: ['GESTAO'],
        rigthButtonHeader: 'sync',
        component: Parametros
    },
    {
        name: 'pagamentos',
        label: 'Pagamentos',
        accessRequired: ['ALUNO'],
        rigthButtonHeader: 'sync',
        component: Pagamentos
    },
    {
        name: 'alunos',
        label: 'Alunos',
        accessRequired: ['GESTAO'],
        rigthButtonHeader: 'sync',
        component: Usuario
    },
    {
        name: 'instituicoes',
        label: 'Instituições',
        accessRequired: ['GESTAO'],
        rigthButtonHeader: 'sync',
        component: Instituicao
    },
    {
        name: 'cursos',
        label: 'Cursos',
        accessRequired: ['GESTAO'],
        rigthButtonHeader: 'sync',
        component: Cursos
    },
]
