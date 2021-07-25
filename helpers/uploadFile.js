

const { v4: uuidv4 } = require('uuid')
const path = require('path')


const uploadFile = (files ,extValidated = ['png', 'jpg', 'jpeg', 'gif'],folder='')=>{


    return new Promise((resolve,reject)=>{


        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { archivo } = files
        
        const nameCut = archivo.name.split('.')
        const ext = nameCut[nameCut.length - 1]
        // console.log(ext);
        
        // validando la extension
        
        if (!extValidated.includes(ext)) {
            return reject('Archivo no permitido')
        }
        const tempName = uuidv4() + '.' + ext
        const uploadPath = path.join(__dirname, '../uploads/',folder ,tempName)
        
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
        
            resolve(tempName)
        })

    })



}


module.exports ={
    uploadFile
}