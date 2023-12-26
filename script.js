async function fetchRoms() {
    try {
        const response = await fetch('roms.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching ROMs:', error);
        return [];
    }
}

function createRomItem(rom) {
    const romItem = document.createElement('div');
    romItem.classList.add('fileItem');

    const romLink = document.createElement('a');
    romLink.href = rom.url;
    romItem.appendChild(romLink);

    const romImage = document.createElement('img');
    romImage.src = rom.image;
    romImage.alt = rom.name;
    romLink.appendChild(romImage);

    const romDetails = document.createElement('div');
    romDetails.classList.add('romDetails');
    romItem.appendChild(romDetails);

    const romName = document.createElement('p');
    romName.textContent = rom.name;
    romDetails.appendChild(romName);

    const lastUpdated = document.createElement('p');
    lastUpdated.textContent = 'Last Updated:';
    romDetails.appendChild(lastUpdated);

    const dateValue = document.createElement('p');
    dateValue.textContent = rom.lastUpdated;
    romDetails.appendChild(dateValue);
    
    return romItem;
}

async function displayRoms() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear the existing content

    try {
        const roms = await fetchRoms();
        roms.forEach(rom => {
            const romItem = createRomItem(rom);
            fileList.appendChild(romItem);
        });
    } catch (error) {
        console.error('Error displaying ROMs:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await displayRoms();
        adjustColors('Background.jpg');
    } catch (error) {
        console.error('Error on DOMContentLoaded:', error);
    }
});