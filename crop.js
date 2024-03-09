const crop_search = document.querySelector('.stateSelector button');
const crop_searchInput = document.querySelector('.stateSelector input');

function capitalizeEveryWord(str) {
    let words = str.split(' ');

    for (let i = 0; i < words.length; i++) {
        const firstLetter = words[i].charAt(0);
        const restOfWord = words[i].slice(1);

        if (firstLetter === firstLetter.toUpperCase()) {
            words[i] = firstLetter + restOfWord.toLowerCase();
        } else {
            words[i] = firstLetter.toUpperCase() + restOfWord.toLowerCase();
        }
    }

    return words.join(' ');
}


function performCropSearch() {
    const APIKey = '579b464db66ec23bdd000001d58e4dcb922348a949989f902c29e4ce';
    const state1 = document.querySelector('.stateSelector input').value;

    if(state1 == ''){
        console.log('Empty Input');
        return;
    }

    const state = capitalizeEveryWord(state1);
    cropURL = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${APIKey}&format=json&filters%5Bstate%5D=${state}`
    fetch(cropURL).then(response => response.json()).then(data => {
        const record = data.records;
        if(record.length == 0){
            let markup = `
            <tr>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
                <td>No data</td>
            </tr>`;
            document.getElementById('crop-table-body').innerHTML = markup
            console.log('Wrong Input');
            return;
        }

        let markup = "";
        record.map(crop => {
            markup += `
            <tr>
                <td>${crop.state}</td>
                <td>${crop.district}</td>
                <td>${crop.commodity}</td>
                <td>Rs.${crop.modal_price}</td>
            </tr>`;
        });

        document.getElementById('crop-table-body').innerHTML = markup
    });
}

crop_search.addEventListener('click', () =>{
    performCropSearch();
});

crop_searchInput.addEventListener('keypress', (e) => {
    if(e.key == 'Enter')
        performCropSearch();
});