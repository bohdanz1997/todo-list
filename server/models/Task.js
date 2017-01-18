module.exports =  function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: models => {
        Task.belongsTo(models.Category);
        Task.belongsTo(models.Priority);
      }
    }
  });

  return Task;
}
