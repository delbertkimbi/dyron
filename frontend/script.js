document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = this.querySelector('input').value;
    alert('Searching for: ' + searchTerm);
});