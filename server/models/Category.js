module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: models => {
        Category.hasMany(models.Task);
      }
    }
  });

  return Category;
}
