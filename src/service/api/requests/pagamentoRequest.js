import { api } from '../api';
import Toast from '../../../components/Toast';

// Controller para obter todos os pagamentos
export const obterTodosPagamentos = async () => {
    const request = await api.get('/pagamento', {
    }).then(response => {
        return response
    }).catch(error => {
        throw error
    });
    return await request.data;

};
/*
// Controller para obter um pagamento pelo ID
export const buscarPagamentoPorId = async (id, data) => {
    const request = await api.get('/pagamento/' + String(id))
    try {
        const { id } = req.params;
        const pagamento = await Pagamento.findByPk(id);
        if (pagamento) {
            return res.status(200).json(pagamento);
        }
        throw new Error('Pagamento não encontrado.');
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter pagamento', error: error.message });
    }
};


// Controller para criar um novo pagamento
const criarPagamento = async (req, res) => {
    try {
        const novoPagamento = await Pagamento.create(req.body);
        res.status(201).json(novoPagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar novo pagamento', error: error.message });
    }
};

// Controller para atualizar um pagamento existente
const atualizarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Pagamento.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const pagamentoAtualizado = await Pagamento.findByPk(id);
            return res.status(200).json(pagamentoAtualizado);
        }
        throw new Error('Pagamento não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar pagamento', error: error.message });
    }
};

// Controller para excluir um pagamento
export const deletarPagamento = async (id) => {
    const request = await api.delete('/pagamento/' + String(id))
        .then(response => {
            <Toast actionType={success} title={'Sucesso!'} description={'Pagamento excluido com sucesso! '} />
            return response;
        })
        .catch(error => {
            <Toast actionType={error} title={'Erro!'} description={error.response ? error.response.data : 'Erro ao excluir o Pagamento! '} />
            console.error(error);
            throw (error);
        })
    return request;
};
*/