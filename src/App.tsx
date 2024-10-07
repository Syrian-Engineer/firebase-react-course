import { Box, Button, Input, Text } from "@chakra-ui/react"
import Auth from "./Components/Auth"
import { auth, db, storage } from "./FireBase/firebase-config"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { ref, uploadBytes } from "firebase/storage"


interface Movie{
  title:string,
  releasedData:number,
  receviedAnOscar:boolean
  id:string
}


const App = () => {
  const[movies,setMovies] = useState<Movie[]>([]);
  const moviesCollectionRef = collection(db,"movies")

  const getMovieList = async()=>{
    try{
     const data = await getDocs(moviesCollectionRef)
     const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
     })) as Movie[];

     setMovies(filteredData)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getMovieList();
  },[])



// To Add Data To My DataBase
  const [movieTitle,setMovieTitle] = useState("");
  const[newReleasedDate,setReleaseData] = useState(0);
  const[isMovieAnOscar,setIsMovieAnOscar] = useState(false)

  const onSubmitMovie = async()=>{
    try{
    await addDoc(moviesCollectionRef,{
      title:movieTitle,
      releasedData:newReleasedDate,
      receviedAnOscar:isMovieAnOscar,
      userId:auth?.currentUser?.uid
    })
    console.log("Data Updated");
    getMovieList();
  }catch(err){
    console.error(err);
  }
  }

// For Deleting Movie
const deleteMovie = async(id:string)=>{
  const movieDoc =  doc(db,"movies",id);
  await deleteDoc(movieDoc);
  getMovieList();
}

// For Updating Movie Title 
const [updatedTitle,setUpdatedTitle] = useState("")


const updateMovieTitle = async(id:string)=>{
  const movieDoc =  doc(db,"movies",id);
  await updateDoc(movieDoc,{title:updatedTitle})
  getMovieList();
}


// For Uploading Files 
const[fileUpload,setFileUpload] = useState<FileList| null>(null) 

const onUploadFile = async()=>{
  if(!fileUpload) return;
  const file = fileUpload[0];
  const fileFolderRef = ref(storage,`ProjectFiles/${file.name}`)
  try{
  await uploadBytes(fileFolderRef,file)
  await alert("FileUploaded")
  }catch(err){
    console.error(err)
  }
}


  return (
    <div>

      <Box display={"flex"} justifyContent={"center"}>
        <Auth />
      </Box>
      <Box my={10} display="flex" justifyContent={"center"}>
        <input 
        required
        type="text" 
        placeholder="Movie Title..."
        onChange={(e)=>setMovieTitle(e.target.value)}
        />
        <input 
        required
        type="number" 
        placeholder="ReleasedDate..."
        onChange={(e)=>setReleaseData(Number(e.target.value))}
        />
        <input 
        type="checkBox" 
        checked={isMovieAnOscar}
        onChange={(e)=>setIsMovieAnOscar(e.target.checked)}
        />
        <label >Recevied An Osace</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </Box>

        <Box position={"absolute"} left='36%'>
          {movies.map((movie)=>(
            <Box mx={9} key={movie.id}>
              <h1 style={{color: movie.receviedAnOscar? "green" : "red"}}>{movie.title}</h1>
              <Text>Date : {movie.releasedData}</Text>
              <Text>Received an Oscar: {movie.receviedAnOscar ? 'Yes' : 'No'}</Text> 
              <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
              <Input 
              placeholder="Update Title..."
              onChange={(e)=>setUpdatedTitle(e.target.value)}
              />
              <Button
              onClick={()=> updateMovieTitle(movie.id)}
              >Update Title</Button>
            </Box>
          ))}
            <Box my={25}>
                <Input 
                type="file"
                placeholder="Upload Your File..."
                onChange={(e)=>setFileUpload(e.target.files)}
                />
                <Button onClick={onUploadFile}>Upload File</Button>
          </Box>
        </Box>


    </div>
    
  )
}

export default App