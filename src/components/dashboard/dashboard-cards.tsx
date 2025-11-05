import type { ITask } from "../../types/task";

export default function DashboardCards({
  tasks,
}: Readonly<{ tasks: ITask[] }>) {
  const cardStyle =
    "flex flex-col bg-white rounded-2xl shadow p-5 justify-start text-left gap-4 p-10";
  const headerStyle = "text-xl text-gray-600";
  const completedTasks = tasks.filter((task) => task.is_completed).length;
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
        <div>PIE CHART</div>
      </div>
    </div>
  );
}
