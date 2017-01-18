import { Task, Category, Priority } from "../models";

export function listPriorities() {
    return Priority.findAll();
}

export function listCategories() {
    return Category.findAll({
      include: [Task]
    });
}

export function listTasks() {
    return Task.findAll({
      include: [{ all: true, nested: true }]
    });
}

export function getTask(id) {
  return Task.find({
    where: {id: id},
    include: [{ all: true, nested: true }]
  });
}

export function createCategory(data) {
  return Category.create({name: data.name});
}

export function deleteCategory(id) {
   return Task.findAll({
    where: { CategoryId: id }
  }).then((tasks) => {
    if(tasks.length > 0) {
      let ids = [];

      for(let i in tasks) {
        ids.push(tasks[i].id);
      }
      console.log(ids);
     return  Task.destroy({
        where: {
          id: {
            $in: ids
          }
        }
      }).then((code) => {
        return Category.destroy({
          where: { id: id }
        });
      });
    }
    else {
      return Category.destroy({
        where: { id: id }
      });
    }
  });
}

export function createTask(data) {
  if (data.categoryId !== 0) {
    return Category.findById(data.categoryId).then(found => {
      return Task.create({
        name: data.name,
        CategoryId: found.id,
        category: found.name,
        isDone: false,
        PriorityId: data.priorityId
      });
    });
  }

  return Task.create({
    name: data.name,
    CategoryId: null,
    category: "None",
    isDone: false,
    PriorityId: data.priorityId
  });
}

export function editTask(data) {
  console.log(data);
  return Task.update({
    name: data.name,
    CategoryId: data.categoryId,
    isDone: data.isDone,
    PriorityId: data.priorityId
  }, {
    where: {id: data.id}
  });
}

export function deleteTask(id) {
    return Task.destroy({
      where: {id: id}
    });
}
