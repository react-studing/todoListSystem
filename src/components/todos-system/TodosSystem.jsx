import { useEffect, useState } from "react";
import ClassificationButtons from "../classification-buttons/ClassificationButtons";
import CreateButton from "../create-button/CreateButton";
import CreateTodoInput from "../create-todo-input/CreateTodoInput";
import Todo from "../todo/Todo";
import TodosSystemHeader from "../todos-system-header/TodosSystemHeader";
import "./todosSystem.css";
import { TodoContentContext } from "../../contexts/TodoContent";
import { TodoContents } from "../../contexts/TodoContents";
import { TodoContentDescriptoinContext } from "../../contexts/TodoContentDescriptoinContext";
import { EditContentTitle } from "../../contexts/EditContentTitle";
import { TotalTodos } from "../../contexts/TotalTodos";
import { CompletedTodo } from "../../contexts/CompletedTodos";
import { UnCompletedTodo } from "../../contexts/UnCompletedTodos";
import { Id } from "../../contexts/Id";

export default function TodosSystem() {
  const [todoContentTitle, setTodoContentTitle] = useState("");
  const [todoContentDescription, setTodoContentDescription] = useState([]);
  const [editContentTitle, setEditContentTitle] = useState([]);
  const [todoContent, setTodoContent] = useState([]);
  const [compoletedTodoContent, setCompoletedTodoContent] = useState([]);
  const [UnCompoletedTodoContent, setUnCompoletedTodoContent] = useState([]);
  const [totalTodos, setTotalTodos] = useState(true);
  const [completeTodos, setCompleteTodos] = useState(false);
  const [unCompleteTodos, setUnCompleteTodos] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    setCompoletedTodoContent(
      todoContent.filter((element) => element.checked === true)
    );
  }, [todoContent]);

  useEffect(() => {
    setUnCompoletedTodoContent(
      todoContent.filter((element) => element.checked === false)
    );
  }, [todoContent]);
  useEffect(() => {
    const totalArray = [...compoletedTodoContent, ...UnCompoletedTodoContent];
    const sortedArray = totalArray.sort((a, b) => a.id - b.id);
    if (JSON.stringify(sortedArray) !== JSON.stringify(todoContent)) {
      setTodoContent(sortedArray);
    }
  }, [compoletedTodoContent, UnCompoletedTodoContent]);
  return (
    <Id.Provider value={{ id, setId }}>
      <UnCompletedTodo.Provider value={{ unCompleteTodos, setUnCompleteTodos }}>
        <CompletedTodo.Provider value={{ completeTodos, setCompleteTodos }}>
          <TotalTodos.Provider value={{ totalTodos, setTotalTodos }}>
            <EditContentTitle.Provider
              value={{ editContentTitle, setEditContentTitle }}
            >
              <TodoContentDescriptoinContext.Provider
                value={{ todoContentDescription, setTodoContentDescription }}
              >
                <TodoContents.Provider value={{ todoContent, setTodoContent }}>
                  <TodoContentContext.Provider
                    value={{ todoContentTitle, setTodoContentTitle }}
                  >
                    <div className="todos-system">
                      <TodosSystemHeader />
                      <hr />
                      <div className="buttons">
                        <ClassificationButtons title="غير منجز" />
                        <ClassificationButtons title="منجز" />
                        <ClassificationButtons title="الكل" />
                      </div>
                      {totalTodos === true ? (
                        todoContent.map((element, index) => {
                          return (
                            <Todo
                              todoContents={todoContent}
                              todoContent={{ ...element, id: index + 1 }}
                              setTodoContent={setTodoContent}
                              key={index}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                      {completeTodos === true ? (
                        compoletedTodoContent.map((element, index) => {
                          return (
                            <Todo
                              todoContents={compoletedTodoContent}
                              todoContent={{ ...element, id: index + 1 }}
                              key={index}
                              setTodoContent={setCompoletedTodoContent}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                      {unCompleteTodos === true ? (
                        UnCompoletedTodoContent.map((element, index) => {
                          return (
                            <Todo
                              todoContents={UnCompoletedTodoContent}
                              todoContent={{ ...element, id: index + 1 }}
                              key={index}
                              setTodoContent={setUnCompoletedTodoContent}
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                      <div className="create-todo-system">
                        <CreateButton />
                        <CreateTodoInput todoContentTitle={todoContentTitle} />
                      </div>
                    </div>
                  </TodoContentContext.Provider>
                </TodoContents.Provider>
              </TodoContentDescriptoinContext.Provider>
            </EditContentTitle.Provider>
          </TotalTodos.Provider>
        </CompletedTodo.Provider>
      </UnCompletedTodo.Provider>
    </Id.Provider>
  );
}
