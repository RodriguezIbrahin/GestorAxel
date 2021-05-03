const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Invoice = sequelize.define('invoice', {

        Number:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Date:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        Status:{
            type: DataTypes.ENUM("Pending", "Paid"), 
            defaultValue: "Pending"
        },
        Balance:{
            type: DataTypes.REAL,
            allowNull: false, 
            defaultValue: 0
        },
        Total:{
            type: DataTypes.REAL, 
            allowNull: false
        },

    },
    {
        timestamps: false,
    })
}