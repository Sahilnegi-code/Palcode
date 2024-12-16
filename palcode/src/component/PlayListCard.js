import React from 'react'
// import { useDrag } from 'react-dnd'
// import { indexes } from '../../../Backend/modals/UserOtpVerification';
import {SortableContext , verticalListSortingStrategy ,useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


const PlayListCard = ({playlist}) => {
    // console.log(temp)
    
    const Card = ({index})=>{
        const {attributes , listeners,setNodeRef ,transform, transition} = useSortable({id:index})
        console.log(setNodeRef,attributes , transform,transition , index)
        const style = {
            transform:CSS.Transform.toString(transform),
            transition
        }
        return(
            <div
            key={index}
            ref = {setNodeRef}
            style={style}
            {...attributes} {...listeners}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
        >
            <div className="w-full h-28 bg-blue-500 rounded-md mb-4"></div>
            <p className="font-medium text-center">
                Product Playlists Name {index}
            </p>
            <span className="text-sm text-gray-400">5 Videos</span>
          </div>
        )
    }

    return (
        <>
        <SortableContext items={playlist} strategy={verticalListSortingStrategy} >
        {
            playlist?.map((item,index)=>  <Card index = {item.id}/>)
        }
        </SortableContext>
        
        
        </>
      
    )
}



export default PlayListCard;











// import React from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// const PlayListCard = ({ index, playlist }) => {
//     const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             {...attributes}
//             {...listeners}
//             className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
//         >
//             <div className="w-full h-28 bg-blue-500 rounded-md mb-4"></div>
//             <p className="font-medium text-center">{playlist.name}</p>
//             <span className="text-sm text-gray-400">5 Videos</span>
//         </div>
//     );
// };

// export default PlayListCard;
