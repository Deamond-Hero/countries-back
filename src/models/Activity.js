const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activity", {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dificulty:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration:{
        type: DataTypes.STRING,
    },
    season:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    timestamps: false,
  });
};
