import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const grievanceBtn = document.getElementById('grievanceBtn');
const grievanceData = document.getElementById('grievanceData');

grievanceBtn.addEventListener('click', async () => {
  const name = document.getElementById('studentName').value.trim();
  const text = document.getElementById('grievanceText').value.trim();

  if(!name || !text){ alert("Fill all fields"); return; }

  try {
    await addDoc(collection(db,"grievances"),{ name, text, status:"Pending" });
    grievanceData.innerHTML = `Grievance submitted successfully by <b>${name}</b>.`;
  } catch(error){ alert("Error: "+error.message); }
});
