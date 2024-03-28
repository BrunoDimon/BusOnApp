import React from 'react';
import { FlatList } from '@gluestack-ui/themed';
import ItemListAluno from './ItemListAluno';

export default function ListAlunos() {
    const alunos = [
        {
            id: 1,
            nome: 'Douglas Kuerten',
            curso: 'Eng. Software',
            instituicao: 'SATC',
            situacao: 'ATIVO'
        },
        {
            id: 2,
            nome: 'Bruno Dimon',
            curso: 'Eng. Software',
            instituicao: 'SATC',
            situacao: 'INATIVO'
        },
        {
            id: 3,
            nome: 'Thiago Dimon Miranda',
            curso: 'Eng. Software',
            instituicao: 'SATC',
            situacao: 'INATIVO'
        }
    ];

    const renderItem = ({ item }) => (
        <ItemListAluno
            situacao={item.situacao}
            curso={item.curso}
            nome={item.nome}
            instituicao={item.instituicao}
        />
    );

    return (
        <FlatList
            data={alunos}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}