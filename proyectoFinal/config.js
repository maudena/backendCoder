export default {
    fileSystem: {
        path: './db'
    },
    mongodb:{
        cnxStr: "mongodb://localhost/ecommerce",
        options: {
            serverSelectionTimeoutMS: 5000,
        }
    }
}