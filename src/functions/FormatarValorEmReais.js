export default function formatarValorEmReais(valorEmReais) {
    const valorFormatado = valorEmReais.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',

    });
    return valorFormatado;
}