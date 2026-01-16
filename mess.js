import { db } from './firebase.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const messBtn = document.getElementById('messBtn');
const messData = document.getElementById('messData');

messBtn.addEventListener('click', async () => {
  const item = document.getElementById('item').value.trim();
  const price = document.getElementById('price').value;
  const type = document.getElementById('type').value;

  if(!item || !price || !type){ alert("Fill all fields"); return; }

  try {
    await addDoc(collection(db,"mess"),{ item, price, type });
    messData.innerHTML = `Item <b>${item}</b> (${type}) added successfully at ₹${price}.`;
  } catch(error){ alert("Error: "+error.message); }
});
