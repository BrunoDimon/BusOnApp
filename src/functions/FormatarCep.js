export default function formatarCep(cep) {
    if (cep == undefined || cep == null) {
        return " ";
    }
    const cepFormatado = String(cep).replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')

    return cepFormatado;
}