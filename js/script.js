// Initialize sample physician data
const physicians = [
    { id: 'P1', name: 'Dr. Alice Smith', specialty: 'Cardiology', availableTimes: ['09:00', '10:00', '11:00'] },
    { id: 'P2', name: 'Dr. Marry Jane', specialty: 'Neurology', availableTimes: ['12:00', '13:00', '14:00'] },
    { id: 'P3', name: 'Dr. Carol Williams', specialty: 'Dermatology', availableTimes: ['15:00', '16:00', '17:00'] },
    { id: 'P4', name: 'Dr. Jenifer Carlton', specialty: 'Obstetrics and gynaecology', availableTimes: ['19:00', '20:00', '21:00'] },
    { id: 'P5', name: 'Dr. Ibrahim Umar', specialty: 'Pediatrics', availableTimes: ['09:00', '10:00', '13:00'] }
  ];
  
  // Populate physician dropdown
  function populatePhysicians() {
    const physicianSelect = document.getElementById('physician');
    physicians.forEach(physician => {
      const option = document.createElement('option');
      option.value = physician.id;
      option.textContent = `${physician.name} (${physician.specialty})`;
      physicianSelect.appendChild(option);
    });
  }
  
  // Populate available time slots based on selected physician
  function updateAvailableTimes() {
    const physicianId = document.getElementById('physician').value;
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="">Select Time</option>'; // Reset available times
  
    if (!physicianId) return;
  
    const selectedPhysician = physicians.find(p => p.id === physicianId);
    
    // Populate the time dropdown with available times
    selectedPhysician.availableTimes.forEach(time => {
      const option = document.createElement('option');
      option.value = time;
      option.textContent = time;
      timeSelect.appendChild(option);
    });
  }
  
  // Call the function to populate physician list on page load
  document.addEventListener('DOMContentLoaded', populatePhysicians);
  
  // Function to handle appointment booking
  function bookAppointment(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const physicianId = document.getElementById('physician').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  
    if (!time) {
      alert('Please select a valid time for the appointment.');
      return;
    }
  
    const selectedPhysician = physicians.find(p => p.id === physicianId);
    const receiptId = `REC-${Date.now()}`;
    const appointment = { name, contact, physician: selectedPhysician.name, specialty: selectedPhysician.specialty, date, time, receiptId };
  
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
  
    const receiptElement = document.getElementById('appointmentReceipt');
    receiptElement.innerHTML = `<strong>Appointment Confirmed!</strong> Physician: ${selectedPhysician.name} (${selectedPhysician.specialty}) on ${date} at ${time}. Receipt ID: ${receiptId}`;
    receiptElement.classList.remove('hidden');
  }
  
 // Function to handle emergency diagnosis with extended logic
function getDiagnosis(event) {
    event.preventDefault();
  
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    let diagnosis = 'General Checkup';
    let medications = ['Multivitamins'];
  
    // Expanded Symptom Checks and Diagnoses
    if (symptoms.includes('chest pain')) {
      diagnosis = 'Possible Heart Issue';
      medications = ['Aspirin', 'Nitroglycerin'];
    } else if (symptoms.includes('headache')) {
      diagnosis = 'Migraine or Neurological Issue';
      medications = ['Ibuprofen', 'Sumatriptan'];
    } else if (symptoms.includes('rash') || symptoms.includes('itching')) {
      diagnosis = 'Allergic Reaction';
      medications = ['Antihistamines', 'Hydrocortisone Cream'];
    } else if (symptoms.includes('fever') && symptoms.includes('sore throat')) {
      diagnosis = 'Flu or Common Cold';
      medications = ['Paracetamol', 'Cough Syrup'];
    } else if (symptoms.includes('abdominal pain') && symptoms.includes('nausea')) {
      diagnosis = 'Gastroenteritis or Food Poisoning';
      medications = ['Oral Rehydration Salts', 'Anti-nausea medication'];
    } else if (symptoms.includes('back pain')) {
      diagnosis = 'Muscle Strain or Arthritis';
      medications = ['Ibuprofen', 'Muscle Relaxants'];
    } else if (symptoms.includes('fatigue') && symptoms.includes('weight loss')) {
      diagnosis = 'Thyroid Disorder or Diabetes';
      medications = ['Thyroid Hormones', 'Insulin'];
    } else if (symptoms.includes('joint pain')) {
      diagnosis = 'Arthritis or Lupus';
      medications = ['Anti-inflammatory Drugs', 'Corticosteroids'];
    } else if (symptoms.includes('dizziness') && symptoms.includes('palpitations')) {
      diagnosis = 'Anemia or Arrhythmia';
      medications = ['Iron Supplements', 'Beta Blockers'];
    } else if (symptoms.includes('cough') && symptoms.includes('difficulty breathing')) {
      diagnosis = 'Bronchitis or Asthma';
      medications = ['Bronchodilators', 'Cough Suppressant'];
    }
  
    const diagnosisResult = { symptoms, diagnosis, medications };
    let diagnoses = JSON.parse(localStorage.getItem('diagnoses')) || [];
    diagnoses.push(diagnosisResult);
    localStorage.setItem('diagnoses', JSON.stringify(diagnoses));
  
    const diagnosisElement = document.getElementById('diagnosisResult');
    diagnosisElement.innerHTML = `<strong>Diagnosis:</strong> ${diagnosis} <br> <strong>Medications:</strong> ${medications.join(', ')}`;
    diagnosisElement.classList.remove('hidden');
  }
  
  