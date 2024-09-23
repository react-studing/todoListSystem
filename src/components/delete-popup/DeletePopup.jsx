import { useContext, useState } from "react";
import "./deletePopup.css";
import { ButtonDeleteStyle } from "../../contexts/ButtonDeleteStyle";
import { TodoContents } from "../../contexts/TodoContents";
import { EditContentTitle } from "../../contexts/EditContentTitle";
import { TodoContentDescriptoinContext } from "../../contexts/TodoContentDescriptoinContext";
export default function DeletePopup({ id }) {
  const buttonDeleteStyle = useContext(ButtonDeleteStyle);
  const [deletePopupShow, setDeletePopupShow] = useState(true);
  const todoContents = useContext(TodoContents);
  const todoContetnsList = [...todoContents.todoContent];
  const editContentTitleContext = useContext(EditContentTitle);
  const todoContentDescriptoinContext = useContext(
    TodoContentDescriptoinContext
  );
  return (
    <>
      <div
        className="delete-popup-background"
        style={
          deletePopupShow === false ? { display: "none" } : { display: "flex" }
        }
      >
        <div className="delete-popup">
          <div className="delete-popup-warning">
            <h1>هل أنت متأكد من رغبتك في حذف المهمة؟</h1>
            <h2>لايمنكنك التراجع عن الحذف في حال اختيار زر : (حذف)</h2>
          </div>
          <div className="delete-popup-buttons">
            <button
              className="delete-cancel-button"
              onClick={() => {
                setDeletePopupShow(false);
                buttonDeleteStyle.setButtonOfDeleteStyle({
                  color: "red",
                  backgroundColor: "white",
                });
              }}
            >
              إغلاق
            </button>
            <button
              className="delete-popup-button"
              onClick={() => {
                const newTodoContentsList = todoContetnsList.filter(
                  (element, index) => {
                    return index + 1 !== id;
                  }
                );
                todoContents.setTodoContent(newTodoContentsList);
                setDeletePopupShow(false);
                buttonDeleteStyle.setButtonOfDeleteStyle({
                  color: "red",
                  backgroundColor: "white",
                });

                const editContentTitleContextList = [
                  ...editContentTitleContext.editContentTitle,
                ];
                const editContentTitleContextListFiltering =
                  editContentTitleContextList.filter((element, index) => {
                    return index + 1 !== id;
                  });
                editContentTitleContext.setEditContentTitle(
                  editContentTitleContextListFiltering
                );
                const todoContentDescriptoinContextList = [
                  ...todoContentDescriptoinContext.todoContentDescription,
                ];
                const todoContentDescriptoinContextListFiltering =
                  todoContentDescriptoinContextList.filter((element, index) => {
                    return index + 1 !== id;
                  });
                todoContentDescriptoinContext.setTodoContentDescription(
                  todoContentDescriptoinContextListFiltering
                );
              }}
            >
              نعم قم بالحذف
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
