import { useContext, useState } from "react";
import "./editPopup.css";
import { TodoContentDescriptoinContext } from "../../contexts/TodoContentDescriptoinContext";
import { TodoContents } from "../../contexts/TodoContents";
import { ButtonEditStyle } from "../../contexts/ButtonEditStyle";
import { EditContentTitle } from "../../contexts/EditContentTitle";
export default function EditPopup({ id }) {
  const [input1IsFocus, setInput1IsFocus] = useState(false);
  const [input2IsFocus, setInput2IsFocus] = useState(false);
  const todoContentDescriptoinContext = useContext(
    TodoContentDescriptoinContext
  );
  const todoContentsContext = useContext(TodoContents);
  const [editPopupShow, setEditPopupShow] = useState(true);

  const buttonEditStyelContext = useContext(ButtonEditStyle);
  const editContentTitleContext = useContext(EditContentTitle);

  return (
    <>
      <div
        className="edit-popup-background"
        style={
          editPopupShow === false ? { display: "none" } : { display: "flex" }
        }
      >
        <div className="edit-popup">
          <h1>تعديل المهمة</h1>
          <div className="edit-inputs">
            <div className="edit-input-title-with-title">
              <label
                style={
                  input1IsFocus === true
                    ? { color: "#5c2431" }
                    : { color: "#ababab" }
                }
              >
                العنوان
              </label>
              <input
                value={editContentTitleContext.editContentTitle[id - 1]}
                type="text"
                onFocus={() => {
                  setInput1IsFocus(true);
                }}
                onBlur={() => {
                  setInput1IsFocus(false);
                }}
                onChange={(event) => {
                  const editContentTitle = [
                    ...editContentTitleContext.editContentTitle,
                  ];
                  editContentTitle[id - 1] = event.target.value;
                  editContentTitleContext.setEditContentTitle(editContentTitle);
                }}
              />
            </div>
            <div className="edit-input-description-with-title">
              <label
                style={
                  input2IsFocus === true
                    ? { color: "#5c2431" }
                    : { color: "#ababab" }
                }
              >
                التفاصيل
              </label>
              <input
                value={
                  todoContentDescriptoinContext.todoContentDescription[id - 1]
                }
                type="text"
                onFocus={() => {
                  setInput2IsFocus(true);
                }}
                onBlur={() => {
                  setInput2IsFocus(false);
                }}
                onChange={(event) => {
                  const todoContentDescriptoin = [
                    ...todoContentDescriptoinContext.todoContentDescription,
                  ];
                  todoContentDescriptoin[id - 1] = event.target.value;
                  todoContentDescriptoinContext.setTodoContentDescription(
                    todoContentDescriptoin
                  );
                }}
              />
            </div>
          </div>
          <div className="edit-buttons">
            <button
              className="cancel-button"
              onClick={() => {
                setEditPopupShow(false);
                buttonEditStyelContext.setButtonOfEditStyle({
                  color: "blue",
                  backgroundColor: "white",
                });
              }}
            >
              إلغاء
            </button>
            <button
              className="edit-button"
              onClick={() => {
                const todoContents = [...todoContentsContext.todoContent];
                todoContents[id - 1] = {
                  ...todoContents[id - 1],
                  id: id,
                  todoTitle: editContentTitleContext.editContentTitle[id - 1],
                  todoDescription:
                    todoContentDescriptoinContext.todoContentDescription[
                      id - 1
                    ],
                };
                setEditPopupShow(false);
                todoContentsContext.setTodoContent(todoContents);

                buttonEditStyelContext.setButtonOfEditStyle({
                  color: "blue",
                  backgroundColor: "white",
                });
              }}
            >
              تعديل
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
