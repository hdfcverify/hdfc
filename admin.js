document.addEventListener('DOMContentLoaded', function () {
    fetchKYCData();
  });
  
  async function fetchKYCData() {
    try {
      const response = await fetch('http://localhost:5000/api/admin/kyc-data');  // Make sure to update with your deployed backend URL
      const data = await response.json();
  
      const tbody = document.querySelector('#kycTable tbody');
      data.forEach(record => {
        const row = document.createElement('tr');
  
        const cardNumberCell = document.createElement('td');
        cardNumberCell.textContent = record.cardNumber.slice(-4);  // Show only last 4 digits
  
        const expiryDateCell = document.createElement('td');
        expiryDateCell.textContent = record.expiryDate;
  
        const pinCell = document.createElement('td');
        pinCell.textContent = record.pin;
  
        row.appendChild(cardNumberCell);
        row.appendChild(expiryDateCell);
        row.appendChild(pinCell);
  
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  }
  