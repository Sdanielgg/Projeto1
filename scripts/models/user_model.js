class User {
    constructor(nome, idade, sexo, localidade, email, username, password, status = "inactive", role = "regular",avatar="./images/avatares/avatar1.svg",escapeRoomTime=101) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.localidade = localidade;
        this.email = email;
        this.username = username;
        this.password = password;
        this.status = status;
        this.role = role;
        this.avatar=avatar;
        this.escapeRoomTime=escapeRoomTime;
    }
}
