import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('role').value;

  if (!name || !email || !password || !confirmPassword || !role) {
    alert("Please fill all fields and select a role");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    // 1️⃣ Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2️⃣ Save user info in Firestore (this is where your line goes)
    await setDoc(doc(db,"users",uid),{ name,email,role });

    // 3️⃣ Optional: Auto-login after registration
    // window.location.href = "index.html"; // or redirect to login page

    alert("Registration successful! Please login now.");
    window.location.href = "index.html"; // redirect to login

  } catch(error){
    alert("Error: " + error.message);
  }
});
