document.getElementById('image-input').addEventListener('change', function(event) {
    const imageDisplay = document.getElementById('image-display');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageDisplay.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file);
    } else {
        imageDisplay.innerHTML = '<p>No image uploaded yet.</p>';
    }
});