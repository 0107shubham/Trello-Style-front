"use client";

import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import LoadingSkeleton from "../LoadingSkeleton";
import { DndContext } from "../../context/DndContext";
import axios from "axios";
import Cookies from "js-cookie";
import CardItem from "../CardItem/page";
import { useDataContext } from "../../context/DataContext";

interface Post {
  id: string;
  categoryId: string;
  title: string;
  deadline: Date | null;
  description: string;
  priority: string;
  status: string;
}

interface Cards {
  id: string;
  categoryId: string;
  title: string;
  posts: Post[];
}

const DndExample = () => {
  const { data, loading, error, setData, setLoading, setError } =
    useDataContext();

  const userId = Cookies.get("userId") || null;

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    console.log("result", result);

    if (!destination) return;

    const sourceDroppableId = source.droppableId.replace("droppable", "");
    const destinationDroppableId = destination.droppableId.replace(
      "droppable",
      ""
    );

    const newData = JSON.parse(JSON.stringify(data)) as Cards[];

    if (sourceDroppableId !== destinationDroppableId) {
      const sourceIndex = newData.findIndex((x) => x.id === sourceDroppableId);
      const destinationIndex = newData.findIndex(
        (x) => x.id === destinationDroppableId
      );

      const [movedItem] = newData[sourceIndex].posts.splice(source.index, 1);
      newData[destinationIndex].posts.splice(destination.index, 0, movedItem);

      setData(newData);
      console.log("new data", newData);

      await axios.post("https://trello-style-back.vercel.app/updateDragPost", {
        id: result.draggableId,
        categoryId: destinationDroppableId,
      });
    } else {
      const droppableIndex = newData.findIndex(
        (x) => x.id === sourceDroppableId
      );

      const [movedItem] = newData[droppableIndex].posts.splice(source.index, 1);
      newData[droppableIndex].posts.splice(destination.index, 0, movedItem);

      setData(newData);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 w-full h-[450px] px-6 justify-between my-4 rounded-lg flex-col lg:flex-row bg-[#FFFFFF]">
        {data.map((val) => (
          <Droppable key={val.id} droppableId={`droppable${val.id}`}>
            {(provided) => (
              <div
                className="w-[286.75px]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-center font-bold mb-6 text-black">
                  <div className="flex justify-between w-full">
                    <p className="font-sans text-[20px] font-normal leading-[24.2px] text-left text-[#555555]">
                      {val.title}
                    </p>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.75 5H11.75"
                        stroke="#555555"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.75 12H16.75"
                        stroke="#555555"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.75 19H21.75"
                        stroke="#555555"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </h2>
                <div className="h-[400px] overflow-y-scroll">
                  {val.posts.map((component: Post, index: number) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <CardItem key={component.id} component={component} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );
};

export default DndExample;
