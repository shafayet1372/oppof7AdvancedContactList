import db from "../firebase-config";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";



export { db, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc }