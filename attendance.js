async function markAttendance(isPresent) {
    const user = auth.currentUser;
    const today = new Date().toISOString().split('T')[0];

    await db.collection("attendance").doc(`${user.uid}_${today}`).set({
        uid: user.uid,
        date: today,
        status: isPresent ? "Present" : "Absent"
    });

    if (!isPresent) {
        // Log a mess cut for the absent student
        await db.collection("mess_cuts").add({
            uid: user.uid,
            date: today,
            amount_reduced: 50 // Example reduction amount
        });
    }
    alert("Attendance logged successfully.");
}