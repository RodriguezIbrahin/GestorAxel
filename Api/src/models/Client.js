const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Client = sequelize.define('client', {

        DNI:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        Name:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        Surname:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        Phone:{
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        Adress:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        Password:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        IsAdmin:{
            type: DataTypes.BOOLEAN, 
            defaultValue: false
        },

    })
}