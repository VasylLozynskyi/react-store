import { db } from "./firebase";
import { ref,  onValue, onSnapshot, set } from "firebase/database";
import { useState } from "react";


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
                      uid: user.uid,
                       name: user.name,
                        email: user.email,
                    }).then(() => {console.log("user add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
  }
}

export const saveProductRespond = (product, respond) => {
  if (product && respond) {
    set(ref(db, `products/`+(+/\d+/.exec(product.id)) + `/respond/` + respond.id),
                      respond,
                    ).then(() => {console.log("respond add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
  }
}

function getRandomUppercaseChar() {
  let r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}

export function generateCode() {
  let prefix = new Array(2).fill().map(() => getRandomUppercaseChar()).join(""),
      integer = Math.floor((Math.random() * 9999) * 7);
  return prefix + integer;
}

export const newDate =() => {
  const date = new Date();
  return date.toString();
} 

export function findResponds(product) {
  let responds = [];
  if (product) {
      const query = ref(db, `products/`+(+/\d+/.exec(product.id)) + `/respond/`);
        return onValue(query, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          for (let r in data){
            responds.push(data[r])
          }
        }
      });
  }
  // returns  () => repoRemoveEventCallbackForQuery(query._repo, query, container)  ??????
  return responds;
}

export const updateToMassResponds = (data) => {
  let resp = [];
  if (data){
    for (let r in data.respond){
      resp.push(data.respond[r])
    }
  }
  return resp;
}