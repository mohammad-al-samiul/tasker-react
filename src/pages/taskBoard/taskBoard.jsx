import React, { useState } from "react";
import SearchBox from "../searchBox/searchBox";
import TaskAction from "./taskAction";

import TaskList from "./taskList";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Learn React Native",
  description:
    "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
  tags: ["web", "react", "js"],
  priority: "High",
  isFavorite: true,
};

export default function Taskboard() {
  const [tasks, setTasks] = useState([defaultTask]);

  return (
    <>
      <section className="mb-20" id="tasks">
        <div className="container lg:px-20">
          <SearchBox />
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction />
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
                  {tasks.map((task, i) => (
                    <TaskList key={i} task={task} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
