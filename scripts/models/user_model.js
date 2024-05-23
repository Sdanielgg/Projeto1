export class User {
    constructor(nome, idade, sexo, localidade, email, username, password, status = "inactive", role = "regular") {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.localidade = localidade;
        this.email = email;
        this.username = username;
        this.password = password;
        this.status = status;
        this.role = role;
    }
}
