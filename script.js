// Function to toggle modal visibility
function toggleModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
  console.log('Menu toggled');
}

// Function to go back to the previous page
function goBack() {
  window.history.back();
}
