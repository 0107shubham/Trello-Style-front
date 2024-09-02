"use client";

import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import LoadingSkeleton from "../LoadingSkeleton";
import { DndContext } from "../../context/DndContext";
import axios from "axios";
import Cookies from "js-cookie";
import CardItem from "../CardItem/page";
import { useDataContext } from "../../context/DataContext";

interface Cards {
  id: string;
  categoryId: string;
  title: string;
  posts: {
    id: string;
    categoryId: string;
    title: string;
    deadline: string;
    description: string;
    priority: string;
    status: string;
  }[];
}

const DndExample = () => {
  const { data, loading, error, setData, setLoading, setError } =
    useDataContext();

  const userId = Cookies.get("userId") || null;
  // console.log("redux data tesing", dataRedux);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchData());
  //   }
  // }, [status, dispatch]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    console.log("result", result);

    if (!destination) return;

    const sourceDroppableId = source.droppableId.replace("droppable", "");
    const destinationDroppableId = destination.droppableId.replace(
      "droppable",
      ""
    );

    if (sourceDroppableId !== destinationDroppableId) {
      const newData = JSON.parse(JSON.stringify(data)); // deep copy to avoid mutating the state directly
      const sourceIndex = newData.findIndex((x) => x.id === sourceDroppableId);
      const destinationIndex = newData.findIndex(
        (x: any) => x.id === destinationDroppableId
      );

      const [movedItem] = newData[sourceIndex].posts.splice(source.index, 1);
      newData[destinationIndex].posts.splice(destination.index, 0, movedItem);

      setData(newData);
      console.log("new data", newData);

      const response = await axios.post(
        "https://trello-style-back.vercel.app/updateDragPost",
        { id: result.draggableId, categoryId: destinationDroppableId }
      );
      console.log(response);
    } else {
      const newData = JSON.parse(JSON.stringify(data)); // deep copy to avoid mutating the state directly
      const droppableIndex = newData.findIndex(
        (x: any) => x.id === sourceDroppableId
      );

      const [movedItem] = newData[droppableIndex].posts.splice(source.index, 1);
      newData[droppableIndex].posts.splice(destination.index, 0, movedItem);

      setData(newData);
    }
  };

  if (!data.length) {
    return <LoadingSkeleton />;
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 w-full h-[450px] px-6  justify-between my-4 rounded-lg flex-col lg:flex-row bg-[#FFFFFF]">
        {data.map((val) => (
          <Droppable key={val.id} droppableId={`droppable${val.id}`}>
            {(provided) => (
              <div
                className="  w-[286.75px]    "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="text-center font-bold mb-6 text-black">
                  <div className="flex justify-between w-full  ">
                    <p className="font-sans text-[20px] font-normal leading-[24.2px] text-left text-[#555555]">
                      {" "}
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.75 12H16.75"
                        stroke="#555555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.75 19H21.75"
                        stroke="#555555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </h2>
                <div className=" h-[400px] overflow-y-scroll">
                  {val.posts?.map((component, index) => (
                    <Draggable
                      key={component.id}
                      draggableId={component.id} // Use component.id here
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

// "use client";

// import { cardsData } from "../../bin/CardsData";
// import { useEffect, useState } from "react";
// import { Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
// import LoadingSkeleton from "../LoadingSkeleton";
// import { DndContext } from "../../context/DndContext";
// import axios from "axios";
// import Cookies from "js-cookie";

// interface Cards {
//   id: string;
//   categoryId: string;
//   title: string;

//   posts: {
//     id: string;
//     categoryId: string;
//     title: string;
//     deadline: string;
//     description: string;
//     priority: string;
//     status: string;
//   }[];
// }

// const DndExample = () => {
//   const [data, setData] = useState<Cards[] | []>([]);
//   const userId = Cookies.get("userId") || null;

//   console.log(data);

//   const onDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     console.log(result);

//     if (!destination) return;
//     if (source.droppableId !== destination.droppableId) {
//       const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
//       const oldDroppableIndex = newData.findIndex(
//         (x) => x.id == parseInt(source.droppableId.split("droppable")[1])
//       );
//       const newDroppableIndex = newData.findIndex(
//         (x) => x.id == parseInt(destination.droppableId.split("droppable")[1])
//       );
//       const [item] = newData[oldDroppableIndex].components.splice(
//         source.index,
//         1
//       );
//       newData[newDroppableIndex].components.splice(destination.index, 0, item);
//       setData([...newData]);
//     } else {
//       const newData = [...JSON.parse(JSON.stringify(data))]; //shallow copy concept
//       const droppableIndex = newData.findIndex(
//         (x) => x.id == parseInt(source.droppableId.split("droppable")[1])
//       );
//       const [item] = newData[droppableIndex].components.splice(source.index, 1);
//       newData[droppableIndex].components.splice(destination.index, 0, item);
//       setData([...newData]);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           "https://trello-style-back.vercel.app/getposts",
//           { userId }
//         );
//         console.log("data fetch", response.data.Data.categories);
//         console.log("data fetch", response.data.categories);
//         console.log("data userid", userId);
//         setData(response.data.Data.categories); // Adjust the data path as per your response structure
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   if (!data.length) {
//     return <LoadingSkeleton />;
//   }

//   return (
//     <DndContext onDragEnd={onDragEnd}>
//       <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
//         {data.map((val, index) => (
//           <Droppable key={val.id} droppableId={`droppable${val.id}`}>
//             {(provided) => (
//               <div
//                 className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <h2 className="text-center font-bold mb-6 text-black">
//                   {val.title}
//                 </h2>
//                 {val.posts?.map((component, index) => (
//                   <Draggable
//                     key={component.id}
//                     draggableId={component.categoryId}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         className="bg-gray-200 mx-1 px-4 py-3 my-3"
//                         {...provided.dragHandleProps}
//                         {...provided.draggableProps}
//                         ref={provided.innerRef}
//                       >
//                         <p> {component.title}</p>
//                         <p> {component.description}</p>
//                         <p> {component.deadline}</p>
//                         <p> {component.status}</p>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DndContext>
//   );
// };

// export default DndExample;
