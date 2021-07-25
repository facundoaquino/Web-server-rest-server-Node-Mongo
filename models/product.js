const {Schema,model} = require('mongoose')


const ProductSchema =  Schema({
   name:{
       type:String,
       required:[true,'El nombre es obligatorio'],
       unique:true
   },
   user:{
       type:Schema.Types.ObjectId,
       ref:'User',
       required:true
   },
   price:{
       type:Number,
       default:0
   },
   img:{
       type:String
   },
   category:{
       type:Schema.Types.ObjectId,
       ref:'Category',
       required:true
   },
   description:{
       type:String
   },
   avaible:{
       type:Boolean,
       default:true
   }

})



ProductSchema.methods.toJSON = function(){
    const {__v,state,...data} =this.toObject()
    return data
}

module.exports = model('Product',ProductSchema)