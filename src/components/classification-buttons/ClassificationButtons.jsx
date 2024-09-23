import { useContext } from "react";
import "./classificationButtons.css";
import { TotalTodos } from "../../contexts/TotalTodos";
import { CompletedTodo } from "../../contexts/CompletedTodos";
import { UnCompletedTodo } from "../../contexts/UnCompletedTodos";
export default function ClassificationButtons({ title }) {
  const todoTotalContext = useContext(TotalTodos);
  const completedTodosContext = useContext(CompletedTodo);
  const unCompletedTodosContext = useContext(UnCompletedTodo);
  return (
    <>
      <button
        className="classification-buttons"
        onClick={() => {
          if (title === "الكل") {
            todoTotalContext.setTotalTodos(true);
            completedTodosContext.setCompleteTodos(false);
            unCompletedTodosContext.setUnCompleteTodos(false);
          }
          if (title === "منجز") {
            todoTotalContext.setTotalTodos(false);
            completedTodosContext.setCompleteTodos(true);
            unCompletedTodosContext.setUnCompleteTodos(false);
          }
          if (title === "غير منجز") {
            todoTotalContext.setTotalTodos(false);
            completedTodosContext.setCompleteTodos(false);
            unCompletedTodosContext.setUnCompleteTodos(true);
          }
        }}
      >
        {title}
      </button>
    </>
  );
}
