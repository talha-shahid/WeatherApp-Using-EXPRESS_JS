// https://api.openweathermap.org/data/2.5/weather?q=Islamabad&units=metric&appid=6527711753a8ad48d8d6f7e3857ec386

console.log("Welcome");
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const city_name = document.getElementById('city_name');
const data_hide = document.querySelector(".middle_layer")


//Get Info Function
const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    // console.log(cityVal);

    if(cityVal===""){
        city_name.innerText='Please Write down the city name';
        data_hide.classList.add("data_hide")
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6527711753a8ad48d8d6f7e3857ec386`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerHTML = `${arrData[0].main.temp}<span><sup>o</sup>C</span>`;
            tempMod=arrData[0].weather[0].main;

            //condition to check sunny or cloudy
            if(tempMod==='Clear'){
                temp_status.innerHTML='<i class="fa-solid fa-sun" style="color: #eccc68"></i>'
            }
            else if(tempMod==='Clouds'){
                temp_status.innerHTML='<i class="fa-solid fa-cloud" style="color: #f1f2f6"></i>'
            }
            else if(tempMod==='Rain'){
                temp_status.innerHTML='<i class="fa-solid fa-cloud-rain" style="color: #a4b0be"></i>'
            }
            else{
                temp_status.innerHTML='<i class="fa-solid fa-sun" style="color: #eccc68"></i>'
            }

            data_hide.classList.remove("data_hide");
        }
        catch{
            city_name.innerText='Please Write your City Name properly';
            data_hide.classList.add("data_hide");
        }

    }
}

//Action Begins
submitBtn.addEventListener('click', getInfo);