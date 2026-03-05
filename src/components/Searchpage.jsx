import { useNavigate,useParams } from "react-router-dom";
import { useState,useEffect } from "react";
export default function Searchpage({type}){
    const[list,setlist]=useState([]);
    const navigate=useNavigate();
    const {query}=useParams();
    const [pagenum,setpagenum]=useState(1);
    const [loading,setlodaing]=useState(false);
    const [search,setsearch]=useState("");
    const [retrieve,setretrieve]=useState(true);

    const fetchlist=async(page = 1)=>{
        setlodaing(true);
        setretrieve(true);
        let limit=type==="anime"?10:20;
        if(type==="manga"&& query) limit=5;
        let url=`https://api.jikan.moe/v4/${type}?limit=${limit}&page=${page}`;
        if(query){
            url=`https://api.jikan.moe/v4/${type}?q=${query}&limit=${limit}&page=${page}`;
        }
        try{
            const response=await fetch(url);
            const dataanime= await response.json();
            if (Array.isArray(dataanime.data)) {
                if(page === 1){
                    setlist(dataanime.data); 
                } else {
                    setlist(prev => [...prev, ...dataanime.data]);
                }
                
            } else {
                console.log("Unexpected API response:", dataanime);
                setlist([]);
                setretrieve(false);
            }
        }catch(err){
            console.log(err);
            setretrieve(false);
            
        }finally {
        setlodaing(false);
        
        
    }
    };

    useEffect(() => {
      setpagenum(1);
      setlist([]);
      setsearch(query||"");
      const fetchData=async ()=>{
        await fetchlist(1);
      }
      fetchData();
    }, [query,type])

    function handlekeydwn(e){
        if(e.key==="Enter"){
            handlesearch();
        }
    }

    function handlesearch(){
        const trimmed=search.trim();
            navigate(`/${type}/${trimmed}`);
    }
   
    function loadmore() {
        const nextPage = pagenum + 1;  
        setpagenum(nextPage);         
        fetchlist(nextPage);           
    }


    return(
        <div className="flex flex-col flex-1 items-center text-white px-2.5">
            <div className="flex border items-center border-gray-300 rounded-full overflow-hidden  bg-white px-3 w-[50%] h-8">

                <input type="text"placeholder="Search..." className=" py-2 outline-none border-none flex-1 min-w-0 text-black" onKeyDown={handlekeydwn} onChange={(e)=>setsearch(e.target.value)} value={search} />

                 <button onClick={handlesearch} className="text-gray-500 hover:text-blue-500 hover:cursor-pointer" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                </button>

            </div>
        {list.length >0 &&(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl mt-6">
                {list.map((listdata)=>(
                    <div className="bg-gray-800 p-2 rounded flex justify-center flex-col items-center gap-1 w-auto" key={listdata.mal_id}>
                        <img src={listdata.images?.jpg?.image_url} alt={listdata.title} />
                        <p className="font-semibold text-xl">{listdata.title}</p>
                        <p>{listdata.episodes || listdata.chapters} episodes</p>
                    </div>
                ))}
            </div>)}
            {loading &&(<p className="mt-4">Loading...</p>)}
            {!loading && !retrieve && (<h3>Sorry can't retrieve data at the moment</h3>)}
            {!loading && retrieve && (
                <div className="mt-8 bg-amber-400 rounded-3xl flex py-2 px-3 hover:cursor-pointer hover:scale-[1.15] select-none text-white font-bold" onClick={loadmore}>
                    Load more
                </div>
            )}
        </div>
    );
}