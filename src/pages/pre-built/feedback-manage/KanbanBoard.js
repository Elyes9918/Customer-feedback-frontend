import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { KanbanColumn } from "./KanbanPartials";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { UpdateFeedbackAction } from "../../../features/feedbackSlice";
import { updateFeedbackApi } from "../../../services/FeedbackService";

const KanbanBoard = ({ feedbackList, setFeedbackList }) => {

  const ColumnsData = [
    { value: "0", label: "Open",theme:"light" },
    { value: "1", label: "In Progress",theme:"primary" },
    { value: "2", label: "To Review",theme:"warning" },
    { value: "3", label: "Completed",theme:"success" },
  ];



  const [openListFeedbacks,setOpenListFeedBacks]=useState(feedbackList?.filter(item => item.status === "0"));
  const [inProgressListFeedbacks,setInProgressListFeedBacks]=useState(feedbackList?.filter(item => item.status === "1"));
  const [toReviewListFeedbacks,setToReviewListFeedBacks]=useState(feedbackList?.filter(item => item.status === "2"));
  const [completedListFeedbacks,setCompletedListFeedBacks]=useState(feedbackList?.filter(item => item.status === "3"));


  const moveTask = (source, destination, draggableId) => {

    const feedbackLists = [openListFeedbacks, inProgressListFeedbacks, toReviewListFeedbacks, completedListFeedbacks];
  
    const sourceList = feedbackLists[source.droppableId];
    const destinationList = feedbackLists[destination.droppableId];
    
    const draggedTask = sourceList.find(task => task.id === draggableId);
    sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, draggedTask);
  
    if (sourceList === openListFeedbacks) setOpenListFeedBacks([...sourceList]);
    else if (sourceList === inProgressListFeedbacks) setInProgressListFeedBacks([...sourceList]);
    else if (sourceList === toReviewListFeedbacks) setToReviewListFeedBacks([...sourceList]);
    else if (sourceList === completedListFeedbacks) setCompletedListFeedBacks([...sourceList]);
    
    if (destinationList === openListFeedbacks) setOpenListFeedBacks([...destinationList]);
    else if (destinationList === inProgressListFeedbacks) setInProgressListFeedBacks([...destinationList]);
    else if (destinationList === toReviewListFeedbacks) setToReviewListFeedBacks([...destinationList]);
    else if (destinationList === completedListFeedbacks) setCompletedListFeedBacks([...destinationList]);
  
    if (source.droppableId !== destination.droppableId) {

      const feedback = {
        id: draggedTask.id,
        status: destination.droppableId
      };

      updateFeedbackApi(feedback);
    }
  };
  
   
  const handleOnDragEnd = (result) => {
    
    const { source, destination, draggableId, type } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "column") {
    }

    if(type==="task"){
       // prevent page from reloading
      moveTask(source,destination,draggableId);

    }
    
  };


  return (
    <DragDropContext onDragEnd={handleOnDragEnd} >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="kanban-container"
            id="kanban-container"
            style={{ width: "1280px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
 
            <KanbanColumn data={openListFeedbacks} setData={setOpenListFeedBacks} column={ColumnsData[0]} key={0} index={0} />
            <KanbanColumn data={inProgressListFeedbacks} setData={setInProgressListFeedBacks} column={ColumnsData[1]} key={1} index={1} />
            <KanbanColumn data={toReviewListFeedbacks} setData={setToReviewListFeedBacks} column={ColumnsData[2]} key={2} index={2} />
            <KanbanColumn data={completedListFeedbacks} setData={setCompletedListFeedBacks} column={ColumnsData[3]} key={3} index={3} />

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
