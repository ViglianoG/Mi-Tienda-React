import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCDsoJy0u5H6dw3MV_K210D8F5enNdSTEg",
  authDomain: "mi-tienda-proyecto-react-coder.firebaseapp.com",
  projectId: "mi-tienda-proyecto-react-coder",
  storageBucket: "mi-tienda-proyecto-react-coder.appspot.com",
  messagingSenderId: "902029004964",
  appId: "1:902029004964:web:536e128486c7eaa560d631"
};

const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app)