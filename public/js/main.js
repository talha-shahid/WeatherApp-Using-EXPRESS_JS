// https://api.openweathermap.org/data/2.5/weather?q=Islamabad&units=metric&appid=6527711753a8ad48d8d6f7e3857ec386

console.log("Welcome");
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const city_name = document.getElementById('city_name');
const data_hide = document.querySelector(".middle_layer");
const day = document.getElementById('day')
const date = document.getElementById('date')

//Day and Date

const getCurrentDay = () => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let currentTime = new Date();
  let day = weekday[currentTime.getDay()];
  return day;
};

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth() + 1];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};

day.innerHTML = getCurrentDay();
date.innerHTML= getCurrentTime();


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