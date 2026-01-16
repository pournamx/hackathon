async function requestPermission() {
    const user = auth.currentUser;
    const reason = document.getElementById('reason').value;
    
    await db.collection("permissions").add({
        studentId: user.uid,
        reason: reason,
        type: "Outing",
        status: "Pending Warden Approval",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Permission request routed to Warden.");
}