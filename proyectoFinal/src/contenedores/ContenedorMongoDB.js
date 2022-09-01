import mongoose from 'mongoose'



class ContenedorMongoDB{
    constructor(nameColl, esquema){
        this.coleccion = mongoose.model(nameColl, esquema)
    }

    async listar(id){
        try{
            const docs = await this.coleccion.find({"_id": id}, {__v: 0})
            if(docs.length == 0){
                throw new Error("Error al listar por id, no encontrado")
            }else{
                return docs;
            }
        }catch(error){
            throw new Error('Error al listar por id')
        }
    }
    
    async listarAll(){
        
    }

    async guardar(newObj){
        try{
            let doc = await this.coleccion.create(newObj)
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        }catch(error){
            throw new Error('Error al guardar')
        }
    }

    async update(elem){
        
    }

    async delete(id){
       
    }

    async deleteAll(){
        
    }
}


export default ContenedorMongoDB