import React from "react";

import TasksStore from '../stores/TasksStore';
import TasksActions from '../actions/TasksActions';
import CategoriesStore from '../stores/CategoriesStore';
import CategoriesActions from '../actions/CategoriesActions';
import PrioritiesStore from '../stores/PrioritiesStore';
import PrioritiesActions from '../actions/PrioritiesActions';

import Header from "./Header.jsx";
import TasksList from "./TasksList.jsx";
import CategoriesList from "./CategoriesList.jsx";
import CreateTask from "./CreateTask.jsx";
import CreateCategory from "./CreateCategory.jsx";


function getStateFromFlux() {
    return {
      categories: CategoriesStore.getCategories(),
      tasks: TasksStore.getTasks(),
      priorities: PrioritiesStore.getPriorities()
    };
}

class App extends React.Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.handleCategoryAdd = this.handleCategoryAdd.bind(this);
        this.handleTaskAdd = this.handleTaskAdd.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.state = {
          data: getStateFromFlux(),
          activeCategoryId: 0
        }
    }

    componentWillMount() {
        TasksActions.loadTasks();
        CategoriesActions.loadCategories();
        PrioritiesActions.loadPriorities();
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
        CategoriesStore.addChangeListener(this._onChange);
        PrioritiesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
        CategoriesStore.removeChangeListener(this._onChange);
        PrioritiesStore.addChangeListener(this._onChange);
    }

    handleCategoryDelete(cat) {
        CategoriesActions.deleteCategory(cat.id);
    }

    handleCategoryClick(id) {
      this.setState({ activeCategoryId: id });
    }

    handleCategoryAdd(data) {
        CategoriesActions.createCategory(data);
    }

    handleTaskDelete(task) {
        TasksActions.deleteTask(task.id);
    }

    handleTaskAdd(data) {
        TasksActions.createTask(data);
    }

    handleTaskEdit(data) {
        TasksActions.editTask(data);
    }

    handleTaskStatusChange(data) {
        data.isDone = !data.isDone;
        TasksActions.editTask(data);
    }

    _onChange() {
        this.setState({ data: getStateFromFlux() });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <Header />
                    <div className="row">
                      <CategoriesList
                        data={this.state.data}
                        activeCategoryId={this.state.activeCategoryId}
                        onCategoryAdd={this.handleCategoryAdd}
                        onCategoryClick={this.handleCategoryClick}
                        onCategoryDelete={this.handleCategoryDelete} />
                      <TasksList
                        data={this.state.data}
                        activeCategoryId={this.state.activeCategoryId}
                        onCreateClick={this.openTaskModal}
                        onTaskAdd={this.handleTaskAdd}
                        onTaskEdit={this.handleTaskEdit}
                        onTaskStatusChange={this.handleTaskStatusChange}
                        onTaskDelete={this.handleTaskDelete} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
