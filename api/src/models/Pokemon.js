const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    // velocidad: {
    //   type: DataTypes.INTEGER
    // },
    // altura: {
    //   type: DataTypes.DECIMAL
    // },
    // peso: {
    //   type: DataTypes.DECIMAL
    // },
  }, {
    timestamps: false
});
};
