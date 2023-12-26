// Sample function to fetch JSON data (you can use your own method)
async function fetchRoms() {
    const response = await fetch('roms.json');
    const data = await response.json();
    return data;
}

// Function to display ROMs with the latest updates
function displayRoms(roms) {
    const fileList = document.getElementById('fileList');

    // Sort ROMs by lastUpdated date in descending order
    roms.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

    roms.forEach(rom => {
        const romItem = document.createElement('div');
        romItem.classList.add('fileItem');

        // Display ROM information
        const romImage = document.createElement('img');
        romImage.src = rom.image;
        romImage.alt = rom.name;
        romItem.appendChild(romImage);

        const romName = document.createElement('p');
        romName.textContent = rom.name;
        romItem.appendChild(romName);

        const lastUpdated = document.createElement('p');
        lastUpdated.textContent = `Last Updated: ${rom.lastUpdated}`;
        romItem.appendChild(lastUpdated);

        fileList.appendChild(romItem);
    });
}

// Function to dynamically adjust colors based on the background image
function adjustColors(backgroundImageUrl) {
    const colorThief = new ColorThief();

    // Create an image element and set the background image
    const img = new Image();
    img.src = backgroundImageUrl;

    img.onload = function () {
        // Get the dominant color
        const dominantColor = colorThief.getColor(img);

        // Apply the color to relevant elements
        document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            button.style.color = '#fff'; // You can adjust the text color based on your needs
        });

        const contentText = document.querySelectorAll('#content, .fileItem p');
        contentText.forEach(textElement => {
            textElement.style.color = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        });
    };
}

// Fetch ROMs and display them on page load
document.addEventListener('DOMContentLoaded', async () => {
    const roms = await fetchRoms();
    displayRoms(roms);

    // Adjust colors based on the background image
    adjustColors('Background.png'); // Replace with the actual path to your background image
});
