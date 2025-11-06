import DashboardCards from "./dashboard-cards";
import DashboardList from "./dashboard-list";
import CreateModal from "./create-modal";
import { DashboardHeader } from "./dashboard-header";
import { useTask } from "../../hooks/useTask";
import { BiPlus } from "react-icons/bi";
import TopNavbar from "./top-navbar";

export default function Dashboard() {
  const {
    tasks,
    search,
    setSearch,
    filteredTasks,
    onCheckHandler,
    onEditHandler,
    onDeleteHandler,
    onCreateTask,
    setIsModalOpen,
    isModalOpen,
  } = useTask();

  return (
    <div>
      <TopNavbar />
      <div className="pt-20">
        {tasks.length > 0 ? (
          <>
            {/**Dashboard Cards */}
            <DashboardCards tasks={tasks} />

            <DashboardHeader
              search={search}
              setSearch={setSearch}
              setIsModalOpen={setIsModalOpen}
            />
            {/**Dashboard List */}
            <DashboardList
              tasks={filteredTasks}
              onCheckHandler={onCheckHandler}
              onEditHandler={onEditHandler}
              onDeleteHandler={onDeleteHandler}
            />
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
            <div className="flex flex-col gap-5 items-center justify-center bg-white rounded-2xl p-10 min-w-[20%]">
              <p>You have no task.</p>
              <button
                className="text-white flex gap-2 bg-blue-400 rounded-md p-3 justify-center items-center hover:bg-blue-500 transition-colors cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <BiPlus className="w-4 h-4" />
                <span>New Task</span>
              </button>
            </div>
          </div>
        )}
        {/**Create Task Modal */}
        <CreateModal
          onCreateHandler={onCreateTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
