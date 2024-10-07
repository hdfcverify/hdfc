// Attach event listener to the form
document.getElementById('kycForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get values from the form inputs
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const pin = document.getElementById('pin').value;

    // Send the form data to the server
    const response = await fetch('http://localhost:5000/api/kyc/card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber, expiryDate, pin }), // Convert form data to JSON
    });

    // Handle the response from the server
    if (response.ok) {
        alert('Card details verified successfully');
        // Optionally reset the form or redirect to another page after successful submission
        document.getElementById('kycForm').reset(); // Clear the form inputs
    } else {
        alert('Error verifying card details'); // Show an error if the request fails
    }
});

// Enable/Disable Submit Button based on Terms checkbox
document.getElementById('terms').addEventListener('change', function () {
    const submitBtn = document.getElementById('submitBtn');
    // Disable or enable the submit button based on whether the terms are checked
    submitBtn.disabled = !this.checked; // Toggle based on checkbox state
});

// Toggle visibility of PIN input
function togglePINVisibility() {
    const pinInput = document.getElementById('pin');
    const type = pinInput.getAttribute('type') === 'password' ? 'text' : 'password';
    pinInput.setAttribute('type', type);

    // Toggle the icon between eye and eye-off
    const icon = document.querySelector('.toggle-visibility');
    icon.textContent = type === 'password' ? '👁️' : '🙈'; // Switch the icon based on input type
}
