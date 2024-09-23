import { useContext } from "react";
import "./createTodoInput.css";
import { TodoContentContext } from "../../contexts/TodoContent";
export default function CreateTodoInput() {
  const TodoContentTitle = useContext(TodoContentContext);
  return (
    <>
      <input
        value={TodoContentTitle.todoContentTitle}
        type="text"
        className="create-todo-input"
        placeholder="عنوان المهمة"
        onChange={(event) => {
          TodoContentTitle.setTodoContentTitle(event.target.value);
        }}
      />
    </>
  );
}
