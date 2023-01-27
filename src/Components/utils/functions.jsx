import { db } from "./firebase";
import { ref, doc, onSnapshot, set } from "firebase/database";


export function filterIt(arr, searchKey) {
    
    return arr.filter(item=>item.name.toLowerCase().includes((searchKey.toLowerCase())));
  }

  
export const createUserProfile = (user) => {
  if (user) {
    set(ref(db, `users/`+user.uid),
                    {
                        name: "Name",
                        uid: user.uid,
                        email: user.email,
                    }).then(() => {console.log("user add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
  }
  
}

export const updateUserProfile = (user) => {
  if (user) {
    set(ref(db, `users/`+user.uid),
                    {
                       name: user.name,
                        email: user.email,
                    }).then(() => {console.log("user add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
  }
  
}
