from firebase_functions import firestore_fn
from firebase_admin import initialize_app, firestore
from twilio.rest import Client

# Initialize the Admin SDK to access Firestore
initialize_app()
db = firestore.client()

# Twilio Credentials
TWILIO_SID = 'your_sid'
TWILIO_AUTH_TOKEN = 'your_token'
TWILIO_PHONE = 'your_twilio_number'

@firestore_fn.on_document_updated(document="admissions/{studentId}")
def send_status_sms(event: firestore_fn.Event[firestore_fn.Change[firestore_fn.DocumentSnapshot]]) -> None:
    """Triggers when an admission status is updated."""
    
    # Get the document data after the change
    new_snapshot = event.data.after
    if not new_snapshot:
        return
        
    new_data = new_snapshot.to_dict()
    old_data = event.data.before.to_dict()

    # Only act if the status field actually changed
    if new_data.get('status') != old_data.get('status'):
        phone = new_data.get('phone')
        name = new_data.get('name')
        status = new_data.get('status')
        
        message_body = f"Hostel Update: Hello {name}, your application status is now {status}."
        
        client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(body=message_body, from_=TWILIO_PHONE, to=phone)