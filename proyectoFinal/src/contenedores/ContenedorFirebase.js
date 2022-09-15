import admin from "firebase-admin";
import config from "../../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nameColl) {
    this.coleccion = db.collection(nameColl);
  }

  async listar(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      if (!doc.exists) {
        throw new Error("Error al listar por id");
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async listarAll() {
    try {
      const result = [];
      const listado = await this.coleccion.get();
      listado.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }

  async guardar(elem) {
    try {
      const saved = await this.coleccion.add(elem);
      return { ...elem, id: saved.id };
    } catch (error) {
      console.log(error.message);
    }
  }

  async actualizar(elem) {
    try {
      const upd = await this.coleccion.doc(elem.id).set(elem);
      return upd;
    } catch (error) {
      console.log(error.message);
    }
  }

  async delete(id) {
    try {
      const item = await this.coleccion.doc(id).delete();
      return item;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteAll() {

    function deleteCollection(path) {
        firebase.firestore().collection(path).listDocuments().then(val => {
            val.map((val) => {
                val.delete()
            })
        })
    }
    try {
        deleteCollection(this.nameColl)
    } catch (error) {
        console.log(error.message);
    }
   
  }
}

export default ContenedorFirebase;
