export default function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    console.log(email)
    return re.test(email);
}