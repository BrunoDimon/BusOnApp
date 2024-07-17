export default function formatarNumeroTelefone(numeroTelefone) {
    if (numeroTelefone == undefined || numeroTelefone == null) {
        return " ";
    }
    const numeroTelefoneFormatado = String(numeroTelefone).replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')

    return numeroTelefoneFormatado;
}