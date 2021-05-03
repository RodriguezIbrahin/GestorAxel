const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Payment = sequelize.define('payment', {

        Date:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Amount:{
            type: DataTypes.REAL,
            allowNull: false
        },

    },
    {
        timestamps: false,
    })
}