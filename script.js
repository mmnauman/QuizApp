// Helper Functions
    
function createEl(name){
   return document.createElement(name);
}
    
function appendEl(name, appendEl){
   return name.appendChild(appendEl);
}

// Url To Fetch

const url = "https://cdn.rawgit.com/mmnauman/html5/7172c0a6/quiz.json";

fetch(url).
    then((res)=> res.json()).
        then((data) => {
           let section = createEl("section");
          let h3 = createEl("h3");
        let answer = "";  
        let questions = "";
        for(var i = 0; i < data.length; i++){  
            answer += data[i].answer;
            questions += `
            <section class='jumbotron' id='page${i}'>
            <h3 id='question'> ${data[i].question} </h3>
            <div class='main_options'>
             <div class='optionsWrapA optionsWrap'>
            <input id='q${i}' name='q${i}' type='radio' value='a'><label class='label'>a. ${data[i].a}</label>
            <input id='q${i}' name='q${i}' type='radio' value='b'><label class='label'>b. ${data[i].b}</label>
            </div>
             <div class='optionsWrapB optionsWrap'>
            <input id='q${i}' name='q${i}' type='radio' value='c'><label class='label'>c. ${data[i].c} </label>
            <input id='q${i}' name='q${i}' type='radio' value='d'><label class='label'>d. ${data[i].d}</label>
            </div>
            <input id='ans' name='a${i}' type='hidden' value='${data[i].answer}'>
            </div>
            </section>
            <br/>
            `;
        }

     section.innerHTML = questions;  
     var form = document.forms[0];
     form.prepend(section);
}).
    
catch((err)=>{
    console.log(err);
});

$(function(){
   
let totalQuestions = $(".jumbotron").length;
let input = "";
let score = "";
    
console.log(totalQuestions);
    
$("#easyPaginate").on("submit", function(e){
    e.preventDefault();

   //console.log(input.val());
    
    for(let i = 0; i < [totalQuestions-1]; i++){
        if (document.forms[0][`q${String(i)}`].value === ""){
            alert(`You missed question ${i+1}`);
            return false;
        }else{
            document.getElementById("submit").setAttribute('disabled')
        }
            
      //console.log(document.forms[0][`q${String(i)}`].value);      
}
    
    
    
   for(let i = 0; i < [totalQuestions-1]; i++){
       
        if(document.forms[0][`q${String(i)}`].value === document.forms[0][`a${String(i)}`].value){
        score++;
    }
       
   }
    
    const result = $("#result");
    result.css("display", "block");
    result.html(`You have Scored ${score}/8`);
    alert(`You have Scored ${score}/8`);
    
    
    
});
    
});
    
