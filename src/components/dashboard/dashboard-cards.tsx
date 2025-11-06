import type { ITask } from "../../types/task";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function DashboardCards({
  tasks,
}: Readonly<{ tasks: ITask[] }>) {
  const cardStyle =
    "flex flex-col bg-white rounded-2xl shadow p-5 justify-start text-left gap-4 p-10";
  const headerStyle = "text-xl text-gray-600";
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const incompleteTasks = tasks.length - completedTasks;
  
  const pieData = [
    { name: "Completed", value: completedTasks },
    { name: "Incomplete", value: incompleteTasks },
  ];
  
  const COLORS = ["#3b82f6", "#e5e7eb"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 p-10">
      {/** completed tasks */}
      <div className={cardStyle}>
        <h2 className={headerStyle}>Tasks Completed</h2>
        <div className="flex flex-row justify-start">
          <p className="font-medium text-blue-500 text-[52px]">
            {completedTasks}
          </p>
          <span className="text-sm align-bottom mt-auto text-neutral-500">
            / {tasks.length}{" "}
          </span>
        </div>
      </div>
      {/** latest created tasks */}
      <div className={cardStyle}>
        <h2 className={headerStyle}>Latest Created Tasks</h2>
        <div className="flex flex-row justify-start items-stretch">
          <ul className="flex flex-col justify-start text-left list-disc">
            {tasks.length > 0 &&
              tasks.map((task) => {
                return (
                  <li
                    key={`${task.id}`}
                    className={`${task.is_completed && "line-through"}`}
                  >
                    {task.description}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {/** pie chart progress */}
      <div className={cardStyle}>
        <h2 className={headerStyle}>Task Progress</h2>
        {tasks.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} tasks`, '']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[250px] text-gray-400">
            No tasks to display
          </div>
        )}
      </div>
    </div>
  );
}
