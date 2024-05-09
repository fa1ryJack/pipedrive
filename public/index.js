// ---- add hours to scheduled selects ----
var selection = "";
var i = 0;
for(var i = 0; i < 24; i++)
{
    selection += "<option value='"+ zeroFill(i, 2) +"00'>"+ zeroFill(i, 2) + ":00" + "</option>";
}
$('#time_start').html(selection);
$('#time_end').html(selection);
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + "";
}
// ---- add hours to scheduled selects ----


let create = document.querySelector('.create');

create.addEventListener('click', ()=>{
    let inputs = $('input');
    let selects = $('select');
    inputs.css( 'border', '2px solid rgb(221, 221, 221)');
    selects.css( 'border', '2px solid rgb(221, 221, 221)');
    for (let i=0; i<inputs.length; i++){
      if(inputs[i].value == "" && inputs[i].id != "email"){
          insertMessageBox(inputs[i]);
          return;
      }
    }
    for (let i=0; i<selects.length; i++){
      if(selects[i].value == ""){
        insertMessageBox(selects[i]);
        return;
    }
  }

  let dataToServer = JSON.stringify(collectDataToJSON());
  console.log(dataToServer);
  
  fetch("http://localhost:3000/sendDealData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataToServer,
    }).then(response => response.text().then(text =>{
      alert(text);}));
  
});


//create message box "please fill out"
function insertMessageBox(referenceNode) {
  referenceNode.style.border = "1px solid red";
  let message = document.createElement('div');
  message.classList.add('message_box');
  message.innerHTML = '<div class="arrow arrow-up"> </div><div class="message"><span>!</span> Please fill out this field.</div>';
  referenceNode.parentNode.insertBefore(message, referenceNode.nextSibling);
  $('.message_box').fadeIn("fast").delay(3000).fadeOut("fast");
  setTimeout(function(){
    message.parentNode.removeChild(message);
  }, 4000);
}


function collectDataToJSON(){
  jsonData = {};
  let inputs = $('input');
  let selects = $('select');
  let desc = $('textarea');
  inputs.each(function(i){
    jsonData[inputs[i].name] = inputs[i].value; 
  });
  selects.each(function(i){
    if (selects[i].name.slice(0,4) == "time"){
      let time = selects[i].value.slice(0,2) + ":" + selects[i].value.slice(2);
      jsonData[selects[i].name] = time; 
    }else{
      jsonData[selects[i].name] = selects[i].value; 
    }
  });
  jsonData[desc[0].name] = desc[0].value; 
  return jsonData;
}

