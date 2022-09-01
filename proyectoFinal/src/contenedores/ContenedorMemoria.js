


class ContenedorMemoria{
    constructor(){
        this.elementos = []
    }

    async listar(id){

        const objFind = this.elementos.find(x => x.id == id)
        if(!objFind){
            throw new Error('Elemento no encontrado')
        }else{
            return objFind
        }
       
    }
    
    async listarAll(){
        return [...this.elementos]
    }

    async guardar(obj){
        
        let newId
        if(this.elementos.length == 0 ){
            newId = 1
        }else{
            newId = this.elementos[this.elementos.length - 1].id + 1;
        }

        const newObj = {...obj, id:newId}
        this.elementos.push(newObj)
        return newObj
    }

    async update(elem){

        const index = this.elementos.findIndex(x => x.id == elem.id)

        if(index == -1){
            throw new Error(`No se encontro el id : ${id}`)
        }else{
            this.elementos[index] = elem
            return elem
        }
    }

    async delete(id){
        
        const index = this.elementos.findIndex(x => x.id == id)

        if(index == -1){
            throw new Error(`No se encontro el id : ${id}`)
        }else{
            return this.elementos.splice(index, 1)
        }

        

    }

    async deleteAll(){
        this.elementos = []
    }
}

export default ContenedorMemoria