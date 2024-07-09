import Usuario from "../screens/Usuarios/Usuario";
import Parametros from "../screens/Parametros/Parametros";
import Inicio from "../screens/Inicio/Inicio";
import MeusDados from "../screens/MeusDados/MeusDados";
import IaChat from "../screens/IaChat/IaChat";
import Cursos from "../screens/Cursos/Cursos";
import Instituicao from "../screens/Instituicao/Instituicao";
import { Associacao } from "../screens/Associacao/Associacao";
import Pagamentos from "../screens/Pagamento/Pagamentos";
import Documentos from "../screens/Documentos/Documentos";
import TemplatesDocumentos from "../screens/TemplatesDocumentos/TemplatesDocumentos";

export default routes = [
    {
        name: 'inicio',
        label: 'Inicio',
        accessRequired: ['ADMIN', 'GESTAO', 'ALUNO'],
        component: Inicio,
        isInitialRoute: true,
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
        name: 'pagamentos',
        label: 'Pagamentos',
        accessRequired: ['ALUNO', 'GESTAO'],
        rigthButtonHeader: 'sync',
        component: Pagamentos
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
    {
        name: 'documentos',
        label: 'Documentos',
        accessRequired: ['GESTAO', 'ADMIN'],
        rigthButtonHeader: 'sync',
        component: Documentos
    },
    {
        name: 'templates-documentos',
        label: 'Templates Documentos',
        accessRequired: ['ADMIN'],
        rigthButtonHeader: 'sync',
        component: TemplatesDocumentos
    },
]
