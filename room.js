function loadRooms() {
    db.collection("rooms").onSnapshot(snapshot => {
        const container = document.getElementById('roomGrid');
        container.innerHTML = "";
        snapshot.forEach(doc => {
            const room = doc.data();
            container.innerHTML += `
                <div class="card">
                    <img src="${room.photoUrl}" style="width:100%; border-radius:8px;">
                    <h4>Room ${doc.id}</h4>
                    <p>Beds Available: ${room.availableBeds}</p>
                    <p>Bathrooms: ${room.attachedBath ? 'Attached' : 'Common'}</p>
                </div>`;
        });
    });
}