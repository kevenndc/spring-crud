export default class Entity {
    constructor(
        firstName, 
        lastName, 
        fullName, 
        email, 
        phone, 
        isLegalEntity, 
        cpf, 
        cnpj,
    ) {
        this.firstName = firstName,
        this.lastName = lastName 
        this.fullName = fullName
        this.email = email
        this.phone = phone
        this.isLegalEntity = isLegalEntity
        this.cpf = cpf,
        this.cnpj = cnpj
    }

    static emptyEntity() {
        return new Entity('', '', '', '', '', false, '', '')
    }

    toJSON() {
        return JSON.stringify({
            nome: this.firstName,
            sobrenome: this.lastName,
            nome_completo: this.fullName,
            email: this.email,
            telefone: this.phone,
            pessoa_juridica: this.isLegalEntity,
            cpf: this.cpf,
            cnpj: this.cnpj,
        })
    }
    
}
