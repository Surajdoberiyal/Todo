import React, { useEffect, useState } from "react";

const Todo = () => {
  const [toDoList, setToDoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/todos`)
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data?.todos?.slice(0, 5));
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task?.id === Number(id)
        ? { ...task, completed: !task.completed }
        : { ...task };
    });
    setToDoList(mapped);
  };

  const addTask = (userInput) => {
    setLoading(true);
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: userInput,
        completed: false,
        userId: 1,
      }),
    })
      .then((res) => res.json())
      .then((addedTodo) => {
        let copyData = [...toDoList];
        copyData = [...copyData, addedTodo];
        setToDoList(copyData);
        setLoading(false);
      });
  };

  const TodoData = ({ toDoList, completed, loading }) => {
    const checkEmpty = toDoList?.filter((e) => e?.completed === completed);
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Todo</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colspan="2" align="center">
                <div
                  className="spinner-border text-dark my-4"
                  role="status"
                ></div>
              </td>
            </tr>
          ) : checkEmpty?.length !== 0 ? (
            toDoList
              ?.filter((e) => e?.completed === completed)
              ?.map((todo) => {
                return (
                  <tr
                    onClick={() => handleToggle(todo?.id)}
                    className="cursor-pointer"
                  >
                    <th>{todo?.id}</th>
                    <td>{todo?.todo}</td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colspan="2">
                <div className="justify-content-center d-flex text-muted align-items-center p-2">
                  <i className="bx bx-envelope me-3" />
                  <h6 className="mb-0">No Todo</h6>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="todo container">
      <div className="my-5 text-center">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              style={{ width: "400px" }}
              className="form-control"
              value={userInput}
              onChange={(e) => setUserInput(e.currentTarget.value)}
              placeholder="Enter task..."
            />
            <button className="btn btn-primary ms-4">Submit</button>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-md-6 px-5">
          <h4 className="bg_warning text-center py-2 mb-4 rounded"> Pending</h4>
          <TodoData toDoList={toDoList} completed={false} loading={loading} />
        </div>
        <div className="col-md-6 px-5">
          <h4 className="bg_success text-center py-2 mb-4 rounded">
            Completed
          </h4>
          <TodoData toDoList={toDoList} completed={true} loading={false} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
