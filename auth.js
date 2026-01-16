// --- LOGIN FUNCTION ---
function login(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Login Failed: " + error.message);
        });
}

// --- REGISTER FUNCTION ---
function register(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Create a user profile in Firestore
            return db.collection("users").doc(userCredential.user.uid).set({
                email: email,
                role: "student", // Default role
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Account created successfully!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Registration Failed: " + error.message);
        });
}

// --- LOGOUT FUNCTION ---
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
}

// --- AUTH OBSERVER ---
auth.onAuthStateChanged((user) => {
    const isLoginPage = window.location.pathname.includes("index.html") || window.location.pathname === "/";
    if (user && isLoginPage) {
        window.location.href = "dashboard.html";
    }
    if (!user && !isLoginPage) {
        window.location.href = "index.html";
    }
});