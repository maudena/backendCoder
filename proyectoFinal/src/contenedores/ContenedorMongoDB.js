import mongoose from 'mongoose'
import { asPOJO, removeField, renameField } from "../utils/objUtils.js";




class ContenedorMongoDB{
    constructor(nameColl, esquema){
        this.coleccion = mongoose.model(nameColl, esquema)
    }

    async listar(id){
        try{
            const result = await this.coleccion.findById(id)
            return result
        }catch(error){
            console.log(error.message);
        }
    }
    
    async listarAll(){
        try{
            const docs = this.coleccion.find()
            return docs
        }catch(error){
            throw new Error('Error al listar los productos')
        }
    }

    async guardar(newObj){
        
        try{
            let doc = await this.coleccion.create(newObj)
            doc = asPOJO(doc)
            renameField(doc, "_id", "id")
            removeField(doc, '__v')
            return doc
        }catch(error){
            throw new Error('Error al guardar')
        }
    }

    async actualizar(elem){
        try{
            renameField(elem, 'id', '_id')
            const result = await this.coleccion.replaceOne({'_id': elem._id },elem)
            return elem
        }catch(error){
            console.log(error.message);
        }
    }

    async delete(id){
       try {
            const result = this.coleccion.findByIdAndDelete(id)
            return result
       } catch (error) {
        console.log(error.message);
       }
    }

    async deleteAll(){
        try {
            const result = await this.coleccion.deleteMany({})
        } catch (error) {
            console.log(error.message);
        }
    }
}


export default ContenedorMongoDB