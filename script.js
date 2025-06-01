let currentStep = 0;
const steps = document.querySelectorAll('.step');
const form = document.getElementById('multiStepForm');
const alertBox = document.getElementById('successAlert');
const creditScoreEl = document.getElementById('creditScore');

function showStep(n) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === n);
  });
}

function nextStep() {
  const currentInputs = steps[currentStep].querySelectorAll('input, textarea, select');
  let isValid = true;

  currentInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  });

  if (isValid && currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

// Helper to check if form has any data
function isFormFilled(formData) {
  for (const [key, value] of formData.entries()) {
    if (value.trim() !== "") return true;
  }
  return false;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const allInputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;

  allInputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('is-invalid');
    } else {
      input.classList.remove('is-invalid');
    }
  });

  if (!isValid) return;

  const formData = new FormData(form);

  // Prevent submitting an empty form after reset
  if (!isFormFilled(formData)) return;

  // Submit via fetch to PHP
  fetch('submit_form.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        creditScoreEl.textContent = data.creditScore;
        alertBox.classList.remove('d-none');
        form.reset();
        currentStep = 0;
        showStep(currentStep);
      } else {
        alert("Form submission failed. Try again.");
      }
    })
    .catch(() => {
      alert("An error occurred while submitting.");
    });
});
