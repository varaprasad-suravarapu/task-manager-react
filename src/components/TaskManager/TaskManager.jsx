import {useEffect, useState} from "react"

function TaskManager() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []

  const [tasks, setTasks] = useState(storedTasks)
  const [newTask, setNewTask] = useState("")

  const [filter, setFilter] = useState("all")

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")

  const [isEdit, setIsEdit] = useState(false)
  const [editTask, setEditTask] = useState({})

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isEdit) {
      if (!editTask.title.trim()) {
        setShow(true)
        setMessage("Please enter a task")
        return
      }

      // Loop through all tasks, find the task with the matching ID,
      // replace it with the updated editTask, and keep all other tasks unchanged.
      const updatedTasks = tasks.map((task) =>
        task.id === editTask.id ? editTask : task
      )

      setTasks(updatedTasks)
      setEditTask({})
      setNewTask("")
      setIsEdit(false)
    } else {
      if (!newTask.trim()) {
        setShow(true)
        setMessage("Please enter a task")
        return
      }

      const task = {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
      }

      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const handleEdit = (id) => {
    setIsEdit(true)
    const taskToEdit = tasks.find((task) => task.id === id)

    setEditTask(taskToEdit)
  }

  console.log(editTask)

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
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-4xl">
    {/* Page Header */}
    <div className="mb-8">
      <p className="mb-1 text-sm font-medium text-blue-600">PRODUCTIVITY</p>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Task Manager
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Organize your tasks and stay focused.
      </p>
    </div>

    {/* Main Card */}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Card Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              My Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your daily tasks
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
            {totalTasks} {totalTasks === 1 ? "Task" : "Tasks"}
          </div>
        </div>
      </div>

      {/* Add / Edit Task */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-start"
        >
          <div className="flex w-full flex-col">
            <div className="relative">
              <input
                type="text"
                value={isEdit ? editTask.title : newTask}
                onChange={(e) => {
                  if (isEdit) {
                    setEditTask({
                      ...editTask,
                      title: e.target.value,
                    })
                  } else {
                    setNewTask(e.target.value)
                  }

                  setShow(false)
                }}
                placeholder={isEdit ? "Update your task..." : "What needs to be done?"}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {show && (
              <span className="mt-2 block text-sm font-medium text-red-500">
                {message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full whitespace-nowrap rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
          >
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              filter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            All
            <span className="ml-1.5 opacity-70">({totalTasks})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              filter === "pending"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Pending
            <span className="ml-1.5 opacity-70">({pendingTasks})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("completed")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              filter === "completed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            Completed
            <span className="ml-1.5 opacity-70">({completedTasks})</span>
          </button>
        </div>

        {completedTasks > 0 && (
          <button
            type="button"
            onClick={handleClearCompleted}
            className="text-left text-sm font-medium text-red-500 transition hover:text-red-600 sm:text-right"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* Task List */}
      <div className="p-5 sm:p-6">
        {filteredTasks.length > 0 ? (
          <div className="space-y-2">
            {[...filteredTasks].reverse().map((task) => {
              return (
                <div
                  key={task.id}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                >
                  {/* Task */}
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleChecked(task.id)}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <span
                      className={`truncate text-sm font-medium ${
                        task.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {task.title}
                    </span>
                  </label>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(task.id)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(task.id)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
              ✓
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No tasks available
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Add a task above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  )
}

export default TaskManager
