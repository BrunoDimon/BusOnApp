export default function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}