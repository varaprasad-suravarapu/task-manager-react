import {useEffect, useState} from "react"

function TaskManager() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []

  const [tasks, setTasks] = useState(storedTasks)
  const [newTask, setNewTask] = useState("")

  const [filter, setFilter] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // const handleComplete = (id, status) => {

  //   let UpdatedTasks

  //   if (status === "delete") {
  //     UpdatedTasks = tasks.map((task) =>
  //       task.id === id ? {...task, completed: true} : task
  //     )
  //   } else {
  //     UpdatedTasks = tasks.map((task) =>
  //       task.id === id ? {...task, completed: false} : task
  //     )
  //   }

  //   setTasks(UpdatedTasks)
  // }

  const handleDelete = (id) => {
    const result = tasks.filter((task) => task.id !== id)
    setTasks(result)
  }

  const handleChecked = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? {...task, completed: !task.completed} : task
    )
    setTasks(updatedTasks)
  }

  const totalTasks = tasks.length
  const pendingTasks = tasks.filter((task) => task.completed === false).length
  const completedTasks = tasks.filter((task) => task.completed === true).length
  
  console.log(completedTasks, "")

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed))
  }

  // FILTERS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed
    }
    if (filter === "pending") {
      return !task.completed
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Task Manager</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">My Tasks</h2>

          <div className="mb-6 flex gap-3">
            <form onSubmit={handleSubmit} className="flex w-full gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task..."
                className="flex-1 rounded border border-gray-300 px-4 py-2"
              />

              <button
                type="submit"
                className="rounded bg-blue-600 px-5 py-2 text-white"
              >
                Add Task
              </button>
            </form>
          </div>

          <div className="mb-6 flex border-b pb-3 justify-between">
            <div className="flex gap-4 ">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setFilter("all")}
              >
                All [ {totalTasks} ]
              </button>

              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setFilter("pending")}
              >
                Pending [ {pendingTasks} ]
              </button>

              <button
                type="button"
                className="cursor-pointer"
                onClick={() => setFilter("completed")}
              >
                Completed [ {completedTasks} ]
              </button>
            </div>

            {completedTasks.length > 0 && 
              <button
                type="button"
                onClick={handleClearCompleted}
                className="text-red-600 cursor-pointer"
              >
                Clear Completed
              </button>
            }
          </div>

          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              [...filteredTasks].reverse().map((task) => {
                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded border p-3"
                  >
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleChecked(task.id)}
                      />
                      <span
                        className={
                          task.completed ? "line-through text-slate-500" : ""
                        }
                      >
                        {task.title}
                      </span>
                    </label>

                    {/* {task.completed ? (
                      <button
                        type="button"
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleComplete(task.id, "revert")}
                      >
                        Revert
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleComplete(task.id, "delete")}
                      >
                        Completed
                      </button>
                    )} */}

                    <button
                      type="button"
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                    
                  </div>
                )
              })
            ) : (
              <div> No Tasks available </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager
