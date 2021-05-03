const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Score = sequelize.define('score', {

        nick:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        score:{
            type: DataTypes.REAL, 
            allowNull: false
        },
        catch:{
            type: DataTypes.REAL, 
            allowNull: false
        }
    })
}