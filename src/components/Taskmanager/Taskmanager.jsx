function TaskManager() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Task Manager
        </h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            My Tasks
          </h2>

          <div className="mb-6 flex gap-3">
            <input
              type="text"
              placeholder="Add a task..."
              className="flex-1 rounded border border-gray-300 px-4 py-2"
            />

            <button
              type="button"
              className="rounded bg-blue-600 px-5 py-2 text-white"
            >
              Add Task
            </button>
          </div>

          <div className="mb-6 flex gap-4 border-b pb-3">
            <button type="button">All</button>
            <button type="button">Pending</button>
            <button type="button">Completed</button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded border p-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" />
                <span>Learn React</span>
              </label>

              <button type="button" className="text-red-600">
                Delete
              </button>
            </div>

            <div className="flex items-center justify-between rounded border p-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span className="line-through">Learn CI/CD</span>
              </label>

              <button type="button" className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager