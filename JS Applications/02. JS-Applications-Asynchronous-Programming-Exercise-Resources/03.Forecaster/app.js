function attachEvents() {
    let submitButton = document.getElementById('submit');
    let location = document.getElementById('location');
    let todayForecastEl = document.getElementById('current');
    let fullForecastDiv = document.getElementById('forecast');
    let upcomingDiv = document.getElementById('upcoming');
    console.log(location);
    function onClick(){
        console.log(location);
    }
    submitButton.addEventListener('click', onClick);

    function onClick(){
        if(todayForecastEl.children.length>1){
            todayForecastEl.lastChild.remove();
        }
        if(upcomingDiv.children.length>1){
            upcomingDiv.lastChild.remove();
        }
        if(fullForecastDiv.children.length>2){
            fullForecastDiv.lastChild.remove();
        }
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then(res => {
            if(res.status!=200){
                throw new Error('Response code is not 200');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            let city = data.find(x=>x.name==location.value);
            let cityCode = city.code;
            console.log(cityCode);
            location.value='';
            fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
            .then(res => {
                if(res.status != 200){
                    throw new Error('Status is not 200');
                }
                return res.json();
            })
            .then(data => {
                let condition = data.forecast.condition;
                let low = data.forecast.low;
                let high = data.forecast.high;
                let name = data.name;
                let divToappend = createTodayDiv(condition, low, high, name);
                todayForecastEl.appendChild(divToappend);
            })

            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
            .then(res => {
                if(res.status!=200){
                    throw new Error('Response code is not 200');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                let upcomingForecastToAppend = createUpcommingDiv(data.name, data.forecast);
                upcomingDiv.appendChild(upcomingForecastToAppend);
            })
           
            fullForecastDiv.style.display = 'block';
        })
        .catch(error => {
            let errorDiv = document.createElement('div');
            errorDiv.textContent='Error';
            fullForecastDiv.appendChild(errorDiv);
            fullForecastDiv.style.display = 'block';
            location.value='';
        })
    }

    function createTodayDiv(condition, low, high, name){
        let todayDiv = document.createElement('div');
        todayDiv.classList.add('forecasts');
        let todaySymbol = GetSymbol(condition);
        todayDiv.innerHTML=`
        <span class="condition symbol">${todaySymbol}</span>
        <span class="condition">
            <span class="forecast-data">${name}</span>
            <span class="forecast-data">${low}&#176/${high}&#176</span>
            <span class="forecast-data">${condition}</span>
        </span>`;

        return todayDiv;
    }

    function createUpcommingDiv(name, daysArray){
        let threeDasyDiv = document.createElement('div');
        threeDasyDiv.classList.add('forecast-info');
        daysArray.forEach(day => {
            let newDaySymbol = GetSymbol(day.condition);
            let newDayLow = day.low;
            let newDayHigh = day.high;

            let newDaySpan = document.createElement('span');
            newDaySpan.classList.add('upcoming');

            newDaySpan.innerHTML = `
            <span class="symbol">${newDaySymbol}</span>
            <span class="forecast-data">${newDayLow}&#176/${newDayHigh}&#176</span>
            <span class="forecast-data">${day.condition}</span>`;

            threeDasyDiv.appendChild(newDaySpan);
        });

        return threeDasyDiv;
    }

    function GetSymbol(condition){
        let symbol ='';
        if(condition==='Sunny'){
            symbol='&#x2600';
        }
        else if(condition==='Partly sunny'){
            symbol='&#x26C5';
        }
        else if(condition==='Overcast'){
            symbol='&#x2601';
        }
        else{
            symbol='&#x2614';
        }

        return symbol;
    }
}

attachEvents();