import React, { useState } from "react";
import SearchBox from "../searchBox/searchBox";
import TaskAction from "./taskAction";

import TaskList from "./taskList";
import AddTaskForm from "./addTaskForm";
import NoTaskFound from "./noTaskFound";

export default function Taskboard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setIsOpenModal(false);
  };

  const handleEditTask = (task) => {
    setIsOpenModal(true);
    setTaskToUpdate(task);
  };

  const handleDeleteTask = (taskId) => {
    const restTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(restTasks);
  };

  const handleAllTaskDelete = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  };

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTaskToUpdate(null);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {isOpenModal && (
          <AddTaskForm
            onSave={handleAddEditTask}
            taskToUpdate={taskToUpdate}
            onCloseModal={handleCloseModal}
          />
        )}
        <div className="container lg:px-20">
          <SearchBox onSearch={handleSearch} />
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAllTaskDelete={handleAllTaskDelete}
              onTaskAddClick={() => setIsOpenModal(true)}
            />
            <div className="overflow-auto">
              <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                  <tr>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                      {" "}
                      Title{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                      {" "}
                      Description{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                      {" "}
                      Tags{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      {" "}
                      Priority{" "}
                    </th>
                    <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                      {" "}
                      Options{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length ? (
                    tasks.map((task, i) => (
                      <TaskList
                        key={i}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onFav={handleFavorite}
                      />
                    ))
                  ) : (
                    <NoTaskFound />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
