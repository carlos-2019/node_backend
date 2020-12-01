const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },  
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    collection: 'Hospitales'
});

// para ponerle otro nombre al id o cualquier dato que venga de la bd solo es fin visual
HospitalSchema.method('toJSON', function(){
    const {__v,...object} = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);