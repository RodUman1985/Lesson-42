
// асинхронные запросы
async function loadCurrecies(){
    const res= await fetch('https://www.nbrb.by/api/exrates/currencies');
    console.log (res);
     let currensies= await res.json();
     //фильтр: убираем недействителдьный валюты
     currensies = currensies.filter((c)=>{
        const d= new Date(c.Cur_DateEnd);
       // const now =new Date();
        const now=Date.now();
        return d.getTime() - now >0; 
      })

     drawCurrencies(currensies);
     
}
loadCurrecies();
function drawCurrencies(currensies){
    const select = document.getElementById('currencies');
    currensies.forEach((c) => {
        const option = document.createElement('option');
        option.innerText=c.Cur_Name;
        option.value=c.Cur_ID;
        select.appendChild(option)
    });

}
async function showExRate (id){
    const url=`https://www.nbrb.by/api/exrates/rates/${id}`;
    const res = await fetch(url);
    const rate= await res.json();
    const d= document.getElementById('exrate');
    d.innerText=`${rate.Cur_Scale}${rate.Cur_Name} = ${rate.Cur_OfficialRate} BYN`;
}