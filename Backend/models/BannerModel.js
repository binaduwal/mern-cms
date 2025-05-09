const mongoose = require('mongoose');


const bannerSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true
    },
    image:{
        url:{
            type:String,
            required:true
        },
        alt:{
            type:String,
            required:true
        }
    },
    button:{
        text:{
            type:String,
            required:true
        },
        link:{
            type:String,
            required:true
    }

    }
})

module.exports = mongoose.model('Banner', bannerSchema);