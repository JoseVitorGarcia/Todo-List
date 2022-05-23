import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection, UsersCollection } from '/imports/api/Collection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { useState, Fragment } from 'react';
import { LoginForm } from './LoginForm';
import { Accounts } from 'meteor/accounts-base';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};
const deleteTask = ({ _id }) => TasksCollection.remove(_id);
const editTask = ( task_id,newValue ) => {
  TasksCollection.update(task_id, {
    $set: {
      text: newValue
    }
  });
};

export const App = () => {
  const user = useTracker(() => Meteor.user()
);
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const logout = () => Meteor.logout();
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
  });
  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;


  return (

    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Lista de tarefas{pendingTasksTitle}</h1>
          </div>
          <>
            <nav className="navigation">
              <div className="user" onClick={logout}>
                Sair
              </div>

            </nav>
          </>
        </div>

      </header>

      <div className="main">
        {user ? (
          <>
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Mostrar todas as tarefas' : 'Esconder tarefas feitas'}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map(task =>
              (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                  onEditClick={editTask}
                />
              )

              )}
            </ul>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
      <footer>
        <div className="footer">
          Este site foi feito utilizando MongoDB, Meteor.js e React
        </div>
      </footer>

    </div>
  );

};