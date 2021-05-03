const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    const Product = sequelize.define('product', {

        Quantity:{
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        ART:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        Price:{
            type: DataTypes.REAL,
            allowNull: false
        },
        Total:{
            type: DataTypes.VIRTUAL,
            get() {
              return `${this.Quantity * this.Price}`;
            },
            set(value) {
              throw new Error('Do not try to set the `Total` value!');
            }
        }

    },
    {
        timestamps: false,
    })
}