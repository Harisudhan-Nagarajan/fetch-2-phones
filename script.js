const searchh = async() =>{
    let url ="https://api-mobilespecs.azharimm.site/v2/brands";

    try{
        let fetch_url = await fetch(url);
        let convert = await fetch_url.json();
        find(convert);
    }catch(err){
         document.getElementById('result').innerHTML="Not Found"
    }
}

function find({data}) {

    let input = document.getElementById('inputfield').value;
   data.filter(async(datas)=>{
      if(datas.brand_name.toLowerCase()===input.toLowerCase()){
        try{
         let fetch_url = await fetch(datas.detail);
         let convert = await fetch_url.json();
         let data = convert.data.phones;
         fetchphones(data);
        }catch(err){
         document.getElementById('result').innerHTML="Not Found"
        }
      }
   });
}

function fetchphones(phones){
    let result= document.getElementById('result');
    result.innerHTML=` <div id="sub"></div>`
  phones.map(async(phone)=>{
    let fetch_url = await fetch(phone.detail);
    let convert = await fetch_url.json();
    let data = convert.data;
    show(data);
  });
}

function show({phone_name,thumbnail,specifications}){
    
    let sub= document.getElementById('sub');
    let div1=document.createElement('div');
    div1.id="card";
    div1.innerHTML=
    `<img src="${thumbnail}" alt="${phone_name}">
    <h5>${phone_name}</h5>
    <p>${specifications[5].specs[1].val}</p>
    <p>${specifications[4].specs[1].val}</p>`
    
    sub.appendChild(div1);
}
