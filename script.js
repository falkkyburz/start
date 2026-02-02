/* --- CLOCK FUNCTIONALITY --- */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000);
updateClock(); 


/* --- ROBUST AUTO-RELOAD (Watch HTML, CSS, and JS) --- */
(function() {
    // List of files to watch for changes
    // Ensure these names match your actual filenames exactly
    const filesToWatch = ['index.html', 'style.css', 'script.js'];
    
    // Store the last modified time for each file
    const lastModifiedTimes = {};

    async function checkForChanges() {
        for (const file of filesToWatch) {
            try {
                // Add a random query param (?nocache=...) to prevent browser caching 
                // of the HEAD request itself. This forces a real check against the server.
                const response = await fetch(file + '?nocache=' + Date.now(), { method: 'HEAD' });
                const newModified = response.headers.get('Last-Modified');

                if (newModified) {
                    // If we have a stored time and it differs from the new time
                    if (lastModifiedTimes[file] && lastModifiedTimes[file] !== newModified) {
                        console.log(`${file} changed. Reloading...`);
                        location.reload();
                        return; // Stop checking other files, we are reloading anyway
                    }
                    // Update the stored time
                    lastModifiedTimes[file] = newModified;
                }
            } catch (error) {
                // Ignore errors (e.g., if a file is temporarily locked or deleted)
                console.warn(`Could not check ${file}:`, error);
            }
        }
    }

    // Check every 1 second
    setInterval(checkForChanges, 5000);
})();
