export default function formatarValorEmReais(valorEmReais) {
    // Formate o valor em reais usando toLocaleString()
    const valorFormatado = valorEmReais.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return valorFormatado;
}