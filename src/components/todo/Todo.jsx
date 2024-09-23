import "./todo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditPopup from "../edit-popup/EditPopup";
import { ButtonEditStyle } from "../../contexts/ButtonEditStyle";
import DeletePopup from "../delete-popup/DeletePopup";
import { ButtonDeleteStyle } from "../../contexts/ButtonDeleteStyle";
import { IsGreen } from "../../contexts/IsGreen";

export default function Todo({ todoContent, todoContents, setTodoContent }) {
  const [buttonOfTrueStyle, setButtonOfTrueStyle] = useState({
    color: "green",
    backgroundColor: "white",
  });
  const [buttonOfEditStyle, setButtonOfEditStyle] = useState({
    color: "blue",
    backgroundColor: "white",
  });
  const [buttonOfDeleteStyle, setButtonOfDeleteStyle] = useState({
    color: "red",
    backgroundColor: "white",
  });

  const todoContentListNew = [...todoContents];
  const todoContentListNew2 = [...todoContents];

  return (
    <>
      <IsGreen.Provider value={{ buttonOfTrueStyle, setButtonOfTrueStyle }}>
        <ButtonDeleteStyle.Provider
          value={{ buttonOfDeleteStyle, setButtonOfDeleteStyle }}
        >
          <ButtonEditStyle.Provider
            value={{ buttonOfEditStyle, setButtonOfEditStyle }}
          >
            <div className="todo">
              <div className="todo-title-description">
                <h1 style={{ color: "white" }} className="todo-title">
                  {todoContent.todoTitle}
                </h1>
                <p style={{ color: "white" }}>{todoContent.todoDescription}</p>
              </div>
              <div className="buttons-of-crud">
                <button
                  className="buttun-of-true"
                  style={{ backgroundColor: todoContent.backgroundColor }}
                  onClick={() => {
                    if (
                      todoContentListNew2[todoContent.id - 1]
                        .backgroundColor === "white"
                    ) {
                      const TodoContent = {
                        ...todoContentListNew[todoContent.id - 1],
                        color: "white",
                        backgroundColor: "green",
                        checked: true,
                      };
                      todoContentListNew[todoContent.id - 1] = TodoContent;
                      setTodoContent(todoContentListNew);
                    } else {
                      const TodoContent = {
                        ...todoContentListNew[todoContent.id - 1],
                        color: "green",
                        backgroundColor: "white",
                        checked: false,
                      };
                      todoContentListNew[todoContent.id - 1] = TodoContent;
                      setTodoContent(todoContentListNew);
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: todoContent.color, margin: "4px" }}
                  />
                </button>
                <button
                  className="buttun-of-edit"
                  style={{
                    backgroundColor: buttonOfEditStyle.backgroundColor,
                  }}
                  onClick={() => {
                    if (buttonOfEditStyle.backgroundColor === "white") {
                      setButtonOfEditStyle({
                        color: "white",
                        backgroundColor: "blue",
                      });
                    } else {
                      setButtonOfEditStyle({
                        color: "blue",
                        backgroundColor: "white",
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{ color: buttonOfEditStyle.color, margin: "4px" }}
                  />
                </button>
                <button
                  className="buttun-of-delete"
                  onClick={() => {
                    if (buttonOfDeleteStyle.backgroundColor === "white") {
                      setButtonOfDeleteStyle({
                        color: "white",
                        backgroundColor: "red",
                      });
                    } else {
                      setButtonOfDeleteStyle({
                        color: "red",
                        backgroundColor: "white",
                      });
                    }
                  }}
                  style={{
                    backgroundColor: buttonOfDeleteStyle.backgroundColor,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: buttonOfDeleteStyle.color, margin: "4px" }}
                  />
                </button>
              </div>
              {buttonOfEditStyle.backgroundColor === "blue" ? (
                <EditPopup id={todoContent.id} />
              ) : (
                <></>
              )}
              {buttonOfDeleteStyle.backgroundColor === "red" ? (
                <DeletePopup id={todoContent.id} />
              ) : (
                <></>
              )}
            </div>
          </ButtonEditStyle.Provider>
        </ButtonDeleteStyle.Provider>
      </IsGreen.Provider>
    </>
  );
}
