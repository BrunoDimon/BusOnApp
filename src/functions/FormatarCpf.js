export default function formatarCpf(cpf) {
    if (cpf == undefined || cpf == null) {
        return " ";
    }
    const cpfFormatado = String(cpf).replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')

    return cpfFormatado;
}