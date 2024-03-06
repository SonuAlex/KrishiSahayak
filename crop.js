const crop_search = document.querySelector('.stateSelector button');

crop_search.addEventListener('click', () =>{
    const APIKey = '579b464db66ec23bdd000001d58e4dcb922348a949989f902c29e4ce';
    const state = document.querySelector('.stateSelector input').value;

    if(state == ''){
        console.log('Empty Input');
        return;
    }

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
});