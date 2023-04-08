import  { useState } from "react";
import { ModalBody,  Col } from "reactstrap";
import { Icon, Button, RSelect } from "../../../components/Component";
import { getDateStructured } from "../../../utils/Utils";
import { useForm } from "react-hook-form";
import { teamList } from "./KanbanData";

export const KanbanTaskForm = ({ toggle, data, setData, taskToBoard, editTask }) => {

  const PriorityOptions = [
    { value: "0", label: "Low" },
    { value: "1", label: "Medium" },
    { value: "2", label: "High" },
    { value: "3", label: "Very High" },
  ];

  const [formData, setFormData] = useState({
    title: editTask ? editTask.title : "",
    desc: editTask ? editTask.desc : "",
    board: null,
    priority: null,
    users: editTask ? editTask.meta.users : [teamList[0]],
  });

  let boardOptions = [];

  Object.keys(data.columns).map((option) => {
    boardOptions = [
      ...boardOptions,
      {
        value: data.columns[option].text,
        label: data.columns[option].text,
        id: data.columns[option].id,
      },
    ];
  });

  const submitForm = (returnVal) => {
    let board = taskToBoard ? taskToBoard : formData.board === null ? boardOptions[0] : formData.board;
    if (editTask) {
      let defaultTask = {
        task: {
          ...data.task,
          [editTask.id]: {
            id: editTask.id,
            title: formData.title,
            desc: formData.desc,
            meta: {
              users: formData.users,
            },
          },
        },
      };
      setData({ ...data, task: defaultTask.task });
      console.log(defaultTask)
    } else {
      let defaultTask = {
        task: {
          ...data.task,
          [`task-newTask`]: {
            id: `task-newTask`,
            title: formData.title,
            desc: formData.desc,
            meta: {
              users: formData.users,
              tags: formData.tags,
              date: getDateStructured(formData.date),
              category: formData.category,
            },
          },
        },
      };

      let defaultColumns = {
        columns: {
          ...data.columns,
          [board.id]: {
            ...data.columns[board.id],
            tasks: [...data.columns[board.id].tasks, `task-newTask`],
          },
        },
      };

      setData({ columnOrder: data.columnOrder, task: defaultTask.task, columns: defaultColumns.columns });
    }

    toggle();
  };

  const deleteTask = () => {
    let defaultData = data;
    delete defaultData.task[editTask.id];

    defaultData.columns[taskToBoard.id].tasks = defaultData.columns[taskToBoard.id].tasks.filter(
      (item) => item !== editTask.id
    );

    setData({ ...defaultData });
  };

  const { errors, register, handleSubmit } = useForm();
  return (
    <ModalBody>
      <a
        href="#cancel"
        onClick={(ev) => {
          ev.preventDefault();
          toggle();
        }}
        className="close"
      >
        <Icon name="cross-sm"></Icon>
      </a>
      <div className="p-2">
        <h5 className="title">{editTask ? "Update" : "Add"} Feedback</h5>
        <div className="mt-4">
          <form className="row gy-4" onSubmit={handleSubmit(submitForm)}>
            <Col sm="12">
              <div className="form-group">
                <label className="form-label">Feedback Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="form-control"
                  ref={register({ required: "This field is required" })}
                />
                {errors.title && <span className="invalid">{errors.title.message}</span>}
              </div>
            </Col>
            
            <Col className="col-12">
              <div className="form-group">
                <label className="form-label">Task Description</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      desc: e.target.value,
                    })
                  }
                  className="form-control no-resize"
                  ref={register({ required: "This field is required" })}
                />
                {errors.desc && <span className="invalid">{errors.desc.message}</span>}
              </div>
            </Col>
            <Col sm="6">
              <div className="form-group">
                <label className="form-label">Select Status</label>
                <RSelect
                  defaultValue={taskToBoard ? boardOptions.find((item) => item.id === taskToBoard.id) : boardOptions[0]}
                  isDisabled={true}
                  options={boardOptions}
                  placeholder="Select a board"
                  onChange={(e) => {
                    setFormData({ ...formData, board: e });
                  }}
                />
              </div>
            </Col>
            <Col sm="6">
              <div className="form-group">
                <label className="form-label">Select Priority</label>
                {/* <RSelect
                  defaultValue={taskToBoard ? boardOptions.find((item) => item.id === taskToBoard.id) : boardOptions[0]}
                  options={boardOptions}
                  placeholder="Select a board"
                  onChange={(e) => {
                    setFormData({ ...formData, board: e });
                  }}
                /> */}
                <RSelect 
                      options={PriorityOptions} 
                      // defaultValue={projectToEdit?.status === "0" ? StatusOptions[0] :
                      // projectToEdit?.status === "1" ? StatusOptions[1] :
                      // projectToEdit?.status === "2" ? StatusOptions[2] : "" }
                      onChange={(e) => {setFormData({ ...formData, priority: e });}}
                        />
              </div>
            </Col>
            <Col sm="12">
              <div className="form-group">
                <label className="form-label">Members Assigned</label>
                <RSelect
                  options={teamList}
                  isMulti
                  defaultValue={formData.users}
                  onChange={(e) => setFormData({ ...formData, users: e })}
                />
              </div>
            </Col>

            <Col className="col-12">
              <ul className="d-flex justify-content-between mt-3">
                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                  <li>
                    <Button color="primary" size="md" type="submit">
                      {editTask ? "Update" : "Add"} Feedback
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggle();
                      }}
                      className="link link-light"
                    >
                      Cancel
                    </Button>
                  </li>
                </ul>
                {editTask && (
                  <ul>
                    <li>
                      <Button color="danger" size="md" onClick={() => deleteTask()}>
                        Delete Task
                      </Button>
                    </li>
                  </ul>
                )}
              </ul>
            </Col>
          </form>
        </div>
      </div>
    </ModalBody>
  );
};


