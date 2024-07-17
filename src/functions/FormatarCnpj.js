export default function formatarCnpj(cnpj) {
    if (cnpj == undefined || cnpj == null) {
        return " ";
    }
    const cnpjFormatado = String(cnpj).replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');

    return cnpjFormatado;
}