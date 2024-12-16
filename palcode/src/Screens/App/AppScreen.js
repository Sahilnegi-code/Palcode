import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { DndContext,  closestCorners} from '@dnd-kit/core';
import { arrayMove} from "@dnd-kit/sortable";
import { api } from '../../api/api';
import PlayListCard from '../../component/PlayListCard';
const AppScreen = () => {
    const navigate = useNavigate();
    const [playListData , setPlaylistData] = useState([
        { name: "Playlist-1",id :1, icon: "⭐" },
        { name: "Playlist-2", id:2,icon: "⭐" },
        { name: "Playlist-3", id:3, icon: "⭐" },
        { name: "playlist-4",id:4, icon: "⭐" },
        { name: "playlist-5",id : 5, icon: "⭐" },
        { name: "playlist-6",id : 6, icon: "⭐" },
        { name: "playlist-7", id : 7,icon: "⭐" },
        { name: "playlist-8", id:8, icon: "⭐" }
]);
    const handleLogOut = () =>{
        localStorage.removeItem('user-info');
        navigate('/login')
    }
    const handleLoadLayout = async () =>{
        try{
            let  storedData = localStorage.getItem('user-info');
            let {email} = JSON.parse(storedData
            );

           const {data} =  await api.post('/api/loadlayout',    
            {
                email 
            },
            {
            headers: {
            'Content-Type': 'application/json', 
            }
                
        })
        let tempPlayListData = JSON.parse(data.structure);
        // console.log(tempPlayListData);
        setPlaylistData(tempPlayListData)
        
    }
    catch(err){
        console.log("Error",err );
    }
    }
    const handleSaveLayout = async () =>{
        try{
            let  data = localStorage.getItem('user-info');
            let {email} = JSON.parse(data);

            await api.post('/api/savelayout',    
            {
                email ,
                playListData
            },
            {
            headers: {
            'Content-Type': 'application/json', 
            }
                
        })
        
    }
    catch(err){
        console.log("Error",err );
    }


}


      let rawData = [
          { name: "Revenue", icon: "⭐" },
          { name: "Shoppable Video", icon: "⭐" },
          { name: "Story", icon: "⭐" },
          { name: "Live Commerce", icon: "⭐" },
          { name: "Playlist Manager", icon: "⭐" },
          { name: "One Click Post", icon: "⭐" },
          { name: "Calander", icon: "⭐" },
          { name: "Higher infulencer", icon: "⭐" }
      ]

      const getTaskPos = (id) => playListData.findIndex((task) => task.id === id);

      const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (active.id === over.id) return;
    
        setPlaylistData((playListData)=>{
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            console.log(arrayMove(playListData, originalPos, newPos));
            return arrayMove(playListData, originalPos, newPos);
        })
   
        
        
      };
  return (
  
        <div className="flex h-screen overflow-hidden bg-gray-900 text-gray-100">
            {/* Left Menu */}
            <aside className="w-1/5 bg-gray-800 p-4 space-y-6 rounded-2xl ml-2 m-4">
                <h1 className="text-2xl font-bold text-white">blaash</h1>
                <ul className="space-y-4">
                    {rawData.map((item, index) => (
                        <li
                            key={index}
                            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                        >
                            {item.icon}
                            <span className="ml-2">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            <div className="flex w-full flex-col mr-3 overflow-hidden pb-4">
                {/* Header */}
                <div className="flex justify-between items-center bg-gray-700 mt-4 p-4 rounded-2xl">
                    <h2 className="text-2xl font-semibold">Design Studio</h2>
                    <div className="flex space-x-4">
                        <button onClick={handleLogOut} className="border border-sky-600 px-4 py-2 rounded-xl">
                           Log Out
                        </button>
                        <button className="border border-sky-600 px-4 py-2 rounded-xl">
                            Import From Youtube
                        </button>
                        <input
                            type="text"
                            placeholder="Search Project..."
                            className="border border-gray-600 px-4 py-2 rounded-xl bg-gray-600 focus:outline-none text-gray-300"
                        />
                        <button className="border border-gray-600 px-2 py-2 rounded-xl">
                            🔔
                        </button>
                        <div className="flex justify-center items-center gap-2">
                            <img
                                src=""
                                alt=""
                                height={40}
                                width={40}
                                className="border border-black rounded-full"
                            />
                            <span>Name</span>
                            <span>⬇️</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex h-full overflow-hidden mt-4">
                    {/* Left Section */}
                    <DndContext   onDragEnd={handleDragEnd} collisionDetection={closestCorners}  >
                    <div className="w-2/3 pr-4 ">
                        <h2 className="text-xl font-semibold mb-4">Product Playlists</h2>
                        <main className="bg-gray-700 p-6 rounded-2xl max-h-full overflow-y-auto">
                            <div className="grid grid-cols-3 gap-4 pb-10">

                                {
                                    
                                        <PlayListCard  playlist = {playListData}/>
                                }
                            </div>
                        </main>
                    </div>
                    </DndContext>
                    {/* Right Section */}
                    <div className="w-1/3">
                        <div className="mb-3  flex gap-x-1.5 justify-end">
                         
                            <button onClick={handleLoadLayout} className="bg-blue-600 px-4 py-1 rounded-2xl">
                                Load Layout
                            </button>
                            <button onClick={handleSaveLayout} className="bg-blue-600 px-4 py-1 rounded-2xl">
                                Save Layout
                            </button>
                        </div>

                        <aside className="bg-gray-800 p-4 flex flex-col space-y-4 rounded-2xl h-[calc(100%-3rem)]">
                            <h3 className="text-lg font-bold">Thumbnail Title</h3>
                            <input
                                type="text"
                                placeholder="Get Sporty in Style"
                                className="p-2 rounded bg-gray-700 focus:outline-none text-gray-300"
                            />
                            <div>
                                <p className="mb-2 font-semibold">Video Status</p>
                                <div className="flex gap-4">
                                    <label>
                                        <input type="radio" name="status" className="mr-1" /> Active
                                    </label>
                                    <label>
                                        <input type="radio" name="status" className="mr-1" /> Inactive
                                    </label>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">Product List</h3>
                            <div className="space-y-4 overflow-y-auto max-h-48">
                                {Array(3)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-gray-700 p-2 rounded flex justify-between"
                                        >
                                            <div>
                                                <p className="font-medium">Video Title Name</p>
                                                <p className="text-sm text-gray-400">4:05:00</p>
                                                <p>Products Attached: 5</p>
                                            </div>
                                            <button className="bg-blue-500 px-2 py-1 rounded">
                                                O
                                            </button>
                                        </div>
                                    ))}
                            </div>
                            <button className="mt-auto bg-blue-600 p-2 rounded text-white">
                                Update Playlist
                            </button>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
  
    )


}

export default AppScreen











