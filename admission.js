async function approveStudent(uid) {
    await db.collection("admissions").doc(uid).update({
        status: "Approved",
        roomAllotted: "101-A",
        reportingDate: "2026-08-01"
    });
    alert("Student approved and SMS notification triggered.");
}