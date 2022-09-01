import { json } from 'express'
import { promises as fs } from 'fs'


class ContenedorArchivo{
    constructor(ruta){
        this.ruta = `${config.fileSystem.path}/${ruta}`
    }

    async listar(id){
        const objs = await this.listarAll()
        const objFind = objs.find(x => x.id == id)
        return objFind
    }
    
    async listarAll(){
        try{
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        }catch(error){
            return []
        }
    }

    async guardar(obj){
        const objs = await this.listarAll()
        
        let newId
        if(objs.length == 0 ){
            newId = 1
        }else{
            newId = objs[objs.length - 1].id + 1;
        }

        const newObj = {...obj, id:newId}
        objs.push(newObj)

        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newObj
        }catch(error){
            throw new Error(`Error al guardar : ${error}`)
        }
    }

    async update(elem){
        const objs = await this.listarAll()
        const index = objs.findIndex(x => x.id == elem.id)

        if(index == -1){
            throw new Error(`No se encontro el id : ${id}`)
        }else{
            objs[index] = elem
            
            try{
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            }catch(error){
                throw new Error(`Error al actualizar : ${error}`)
            }
        }
    }

    async delete(id){
        const objs = await this.listarAll()
        const index = objs.findIndex(x => x.id == elem.id)

        if(index == -1){
            throw new Error(`No se encontro el id : ${id}`)
        }

        objs.splice(index, 1)
        try{
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        }catch(error){
            throw new Error(`Error al borrar : ${error}`)
        }

    }

    async deleteAll(){
        try{
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        }catch(error){
            throw new Error(`Error al borrar : ${error}`)
        }
    }
}


export default ContenedorArchivo