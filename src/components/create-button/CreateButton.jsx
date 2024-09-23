import { useContext } from "react";
import "./createButton.css";
import { TodoContents } from "../../contexts/TodoContents";
import { TodoContentContext } from "../../contexts/TodoContent";
import { EditContentTitle } from "../../contexts/EditContentTitle";
import { TodoContentDescriptoinContext } from "../../contexts/TodoContentDescriptoinContext";
import { Id } from "../../contexts/Id";
export default function CreateButton() {
  const todoContentsContext = useContext(TodoContents);
  const todoContentContext = useContext(TodoContentContext);
  const todoContents = [...todoContentsContext.todoContent];
  const editContentTitleContext = useContext(EditContentTitle);
  const todoContentDescriptoinContext = useContext(
    TodoContentDescriptoinContext
  );
  const idContext = useContext(Id);
  return (
    <>
      <button
        className="create-button"
        onClick={() => {
          idContext.setId((Id) => {
            return Id + 1;
          });
          todoContents.push({
            todoTitle: todoContentContext.todoContentTitle,
            todoDescription: "",
            id: idContext.id,
            checked: false,
            color: "green",
            backgroundColor: "white",
          });
          const d = [...todoContentDescriptoinContext.todoContentDescription];
          d[todoContents.length - 1] = "";
          todoContentDescriptoinContext.setTodoContentDescription(d);
          todoContentsContext.setTodoContent(todoContents);
          const t = [...editContentTitleContext.editContentTitle];
          t[todoContents.length - 1] = todoContentContext.todoContentTitle;
          editContentTitleContext.setEditContentTitle(t);
          todoContentContext.setTodoContentTitle("");
        }}
      >
        اضافة
      </button>
    </>
  );
}
