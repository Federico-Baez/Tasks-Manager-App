import './App.css';
import TaskListComponent from './components/container/task_list';
import LoginFormik from './components/pure/forms/loginFormik';
import RegisterFormik from './components/pure/forms/registerFormik';
import TaskFormik from './components/pure/forms/taskFormik';

function App() {
  return (
    <div className="App">
       <TaskListComponent></TaskListComponent>
       {/* <LoginFormik></LoginFormik> */}
       {/* <RegisterFormik></RegisterFormik> */}
       {/* <TaskFormik></TaskFormik> */}
    </div>
  );
}

export default App;
