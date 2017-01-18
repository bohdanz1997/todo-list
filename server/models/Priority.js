module.exports =  function(sequelize, DataTypes) {
  const Priority = sequelize.define("Priority", {
    name: DataTypes.STRING
  });

  sequelize.sync();

  return Priority;
}
