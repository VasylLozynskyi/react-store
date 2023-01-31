import { db } from "./firebase";
import { ref,  onValue, set } from "firebase/database";

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
                        rates: "",
                    }).then(() => {console.log("user add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
  }
}

export const saveProductRespond = (product, respond) => {
  if (product && respond) {
    set(ref(db, `products/`+(+/\d+/.exec(product.id)) + `/responds/` + product.respondcount),
                      respond,
                    ).then(() => {console.log("respond add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});
    set(ref(db, `products/`+(+/\d+/.exec(product.id)) + `/respondcount`),
                      product.respondcount + 1
                    ).then(() => {console.log("respondcount update to base")})
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
  return  responds;
}

export const updateToMassResponds = (data) => {
  let resp = [];
  if (data){
    for (let r in data.responds){
      resp.push(data.responds[r])
    }
  }
  return resp.reverse();
}

export const filterProducts = (event, products) => {
  let a=[];
  function sortTop(a,b){
    if(+a.rating.rate<+b.rating.rate)return 1;
    if(+a.rating.rate>+b.rating.rate)return -1;
    return 0;
  }
  function sortPop(a,b){
    if(+a.rating.count<+b.rating.count)return 1;
    if(+a.rating.count>+b.rating.count)return -1;
    return 0;
  }
  if (event.localName === "button"){
      switch (event.textContent) {
          case "Top":
              // a = products.filter(product => product.filter === "Top")
                a = [...products].sort(sortTop);
              break;
          case "Popullar":
             // a = products.filter(product => product.filter === "Popullar")
                a = [...products].sort(sortPop);
              break;
          case "recommended":
              a = products.filter(product => product.filter === "recommended")
              break;
          default:
              a = products;   
              break;
      }
  }
  return a
}

export const createMapLinks = (products) => {
  let map =[
    {link: "/react-store/*", data: products},
    {link: "/react-store/Products/Computer", data: products.filter(product => product.category === "Computer")},
    {link: "/react-store/Products/Headphones", data: products.filter(product => product.category === "Headphones")},
    {link: "/react-store/Products/Glasses", data: products.filter(product => product.category === "Glasses")},
    {link: "/react-store/Products/Keyboard", data: products.filter(product => product.category === "Keyboard")},
    {link: "/react-store/Products/Mouse", data: products.filter(product => product.category === "Mouse")},
];

  return map;
}

export const setcreateToUserRate = (rate, product, uid) => {
  if (uid && product) {
    set(ref(db, `users/`+ uid + "/rates/" + product.id + "/"),
                    {
                      productId: product.id,
                      productRate: rate,
                    }).then(() => {console.log("rates in userData add to base")})
                    .catch((error) => {console.log("there was an error, details: " + error)});

    set(ref(db, `products/`+(+/\d+/.exec(product.id)) + `/rating/rate`),
                    ((+product.rating.rate * +product.rating.count) + rate) / (+product.rating.count + 1),
                  ).then(() => {console.log("respond add to base")})
                  .catch((error) => {console.log("there was an error, details: " + error)});
    set(ref(db, `products/`+(+/\d+/.exec(product.id)) + `/rating/count`),
                  (+product.rating.count + 1),
                ).then(() => {console.log("respond add to base")})
                .catch((error) => {console.log("there was an error, details: " + error)});
  }
}