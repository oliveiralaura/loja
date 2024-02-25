class Gamer{

    #id

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

   #nome
    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }
    #email
    get email() {
        return this.#email
    }
    set email(value) {
        this.#email = value
    }
   #senha
    get senha() {
        return this.#senha
    }
    set senha(value) {
        this.#senha = value
    }
   
    #personagem    
    get personagem() {
        return this.#personagem
    }
    set personagem(value) {
        this.#personagem = value
    }
    #dtnasc    
    get dtnasc() {
        return this.#dtnasc
    }
    set dtnasc(value) {
        this.#dtnasc = value
    }
    #coin    
    get coin() {
        return this.#coin
    }
    set coin(value) {
        this.#coin = value
    }

    constructor(nome, senha, email, dtnasc, personagem, coin){
       
        this.#nome = nome
        this.#senha = senha
        this.#email = email
        this.#dtnasc = dtnasc 
        this.#personagem = personagem
        this.#coin = coin
      
    }

     
    toJson(){
        return {
            "id": this.#id,
            "nome_gamer": this.#nome,
            "senha_gamer": this.#senha,
            "email_gamer": this.#email,
            "dtnasc_gamer": this.#dtnasc,
            "personagem": this.#personagem,
            "coin": this.#coin
           
        }
    }
}


module.exports = Gamer