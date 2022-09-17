const renderData=(data)=>{
  let mainDivElement=document.getElementById("countriesData");
  for(let i of data){
    let divElement=document.createElement('div');
    divElement.classList.add("col-3");
    divElement.classList.add("mx-3")
    divElement.classList.add("col-sm-1");
    divElement.classList.add("card");
    divElement.classList.add("p-2");
    divClass=["main"];
    divClass.forEach((style=>divElement.classList.add(style)));

    let country=document.createElement("h4");
    country.innerHTML=i.name;
    countryClass=["heading"];
    countryClass.forEach((style) => 
      country.classList.add(style)
    );
    divElement.appendChild(country);

    let flag=document.createElement("img");
    flag.src=i.flag;
    flagClass=["img-card"];
    flagClass.forEach((style=>flag.classList.add(style)));
    divElement.appendChild(flag);

    let capital=document.createElement("h5");
    capital.innerHTML=i.capital;
    capitalClass=["text-center","text-dark","my-2"];
    capitalClass.forEach((style)=>capital.classList.add(style));
    divElement.appendChild(capital);


    let btn1=document.createElement("button");
    btn1.innerHTML="<i class='bx bxs-caret-up-circle'></i>";
    btn1Class=["btn1"];
    btn1Class.forEach((style)=>btn1.classList.add(style));
    divElement.appendChild(btn1);


    
    btn1.addEventListener('click', function(name){
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+i.capital+'&appid=df1bdbb65bbc6948d30c5f1bbef59eda')
      .then(response => response.json())
      .then(data=> {
        var modalWrap=null;
        console.log(data);
        if(modalWrap!==null){
          modalWrap.remove();
        }
        modalWrap=document.createElement('div');
        var x=data.weather[0].icon;
        var temp=data.main.temp;
        var newtemp=temp-273.15;
        newtemp=parseInt(newtemp);
        console.log(x);
        modalWrap.innerHTML=`
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
        <h5 class="modal-title">Weather</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <section class="weather-part">
          <img src='https://openweathermap.org/img/wn/${x}@4x.png' id="wicon">
          <div class="temp">
            <span class="numb">${newtemp}</span>
            <span class="deg">°</span>C
          </div>
          <br>
          <div class="weather">${data.weather[0].description}</div><br>
          <div class="location">
            <i class='bx bx-map'></i>
            <span>${data.name}, ${data.sys.country}</span>
          </div>
          <div class="bottom-details">
            <div class="column feels">
            <i class='bx bx-wind'></i>
              <div class="details">
                <div class="temp">
                  <span class="numb-2">${data.wind.speed}</span>
                </div>
                <p>Wind</p>
              </div>
            </div>
            <div class="column humidity">
              <i class='bx bxs-droplet-half'></i>
              <div class="details">
                <span>${data.main.humidity}</span>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </section>
          </div>
        </div>
      </div>
        `;
        divElement.appendChild(modalWrap);
        var modal1=new bootstrap.Modal(modalWrap.querySelector('.modal'));
        modal1.show();      
      })   
      .catch(err => alert("Wrong city name!"));
      })
    mainDivElement.appendChild(divElement);
  }
}


const getCountry=async(url)=>{
  const response=await fetch(url);
  const data=await response.json();
  renderData(data);
}

const url="https://restcountries.com/v2/all";
getCountry(url);
