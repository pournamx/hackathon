  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBwQoM_UsvVxpkQcBUDvInTJE3SAl6GNNQ",
      authDomain: "autodorm-c49a7.firebaseapp.com",
      projectId: "autodorm-c49a7",
      storageBucket: "autodorm-c49a7.firebasestorage.app",
      messagingSenderId: "789459387294",
      appId: "1:789459387294:web:5763a841fbe06373948c8f"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // -----------------------------
    // 2. DOM Elements
    // -----------------------------
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // -----------------------------
    // 3. Login
    // -----------------------------
    window.handleLogin = async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      if (!email || !password) { alert("Enter email and password"); return; }

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    };

    // -----------------------------
    // 4. Register
    // -----------------------------
    window.handleRegister = async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      if (!email || !password) { alert("Enter email and password"); return; }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful! You can now login.");
        emailInput.value = "";
        passwordInput.value = "";
      } catch (error) {
        alert("Registration failed: " + error.message);
      }
    };

    // -----------------------------
    // 5. Auth State
    // -----------------------------
    onAuthStateChanged(auth, (user) => {
      if (user) window.location.href = "dashboard.html";
    });

    // -----------------------------
    // 6. Toggle Login/Register UI
    // -----------------------------
    window.toggleAuth = () => {
      const title = document.getElementById("auth-title");
      const subtitle = document.getElementById("auth-subtitle");
      const loginBtn = document.getElementById("login-btn");
      const registerBtn = document.getElementById("register-btn");
      const toggleText = document.querySelector(".toggle-text");

      if (title.textContent === "Hostel Login") {
        title.textContent = "Create Account";
        subtitle.textContent = "Fill in your details to register.";
        loginBtn.style.display = "none";
        registerBtn.style.display = "block";
        toggleText.innerHTML = 'Already have an account? <span onclick="toggleAuth()">Login here</span>';
      } else {
        title.textContent = "Hostel Login";
        subtitle.textContent = "Welcome back! Please enter your details.";
        loginBtn.style.display = "block";
        registerBtn.style.display = "block";
        toggleText.innerHTML = 'Don\'t have an account? <span>Register here</span>';
      }
    };