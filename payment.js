import { storage } from "./firebase.js";
import { ref, uploadBytes } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

function uploadPayment(file) {
  const storageRef = ref(storage, "payments/" + file.name);
  uploadBytes(storageRef, file);
}
