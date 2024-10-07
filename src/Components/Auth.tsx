import { Box, Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithPopup,signOut } from "firebase/auth";
import {auth, googleProvider} from "../FireBase/firebase-config"


const Auth = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    console.log(auth?.currentUser?.photoURL);
    
    const signIn = async()=>{
        try{
        await createUserWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.error(err);
        }   
    }

    const signInWithGoogle = async()=>{
        try{
            await signInWithPopup(auth,googleProvider)    
        }catch(err){
            console.error(err)
        }
    }

    const logOut = async()=>{
        try{
            await signOut(auth)
            console.log("LogOut Successufully");
            
        }catch(err){
            console.error(err);
        }
    }
  return (
    <Box p={10} >
        <Input
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email..."
         />
        <Input
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password..."
        type="password"
         />
         <Button
         onClick={signIn}
          type={"submit"}>
            SignIn
         </Button>

         <Button
         type="submit"
         onClick={signInWithGoogle}
         >
            SignInWithGoogle
         </Button>

         <Button
         onClick={logOut}
          >
            LogOut
         </Button>
    </Box >
  )
}

export default Auth