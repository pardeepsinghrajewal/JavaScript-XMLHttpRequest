/** Find element **/
let aGetNews = document.getElementById('aGetNews');
aGetNews.addEventListener('click',function(e){
 e.preventDefault();
 aGetNewsFun();
});


function aGetNewsFun()
{
 console.log('* aGetNewsFun *');

 let APIkey = '';

 /** Create request object **/
 const xhr = new XMLHttpRequest();

 /** open request object **/
 xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=in&apiKey=${APIkey}`,true);

 /** When request is in progress **/
 xhr.onprogress = function() 
 {
  console.log('onprogress function!');
  let html = `<div class="spinner-border" role="status">
               <span class="visually-hidden">Loading...</span>
             </div>`;
  let newsAccordion = document.getElementById('newsAccordion');
  newsAccordion.innerHTML = html;  
 }

 /** When request is completed **/
 xhr.onload = function(){
  if(this.status == 200)
  {
   
   let response = JSON.parse(this.responseText);
   console.log(response); 
   let html = '';
   if(response['status'] == 'ok')
   {
    let articles = response['articles'];
    
    articles.forEach(function(article,key){
     let img = '';
     let desc = '';
     if(article.urlToImage != null)
     {
      img = `<img src="${article.urlToImage}" style="max-width:100px" class="my-3" alt="alt" />1`;
     }
     if(article.description != null)
     {
      desc = article.description;
     }
     

     html += `<div class="accordion-item">
     <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNews-${key}"
       aria-expanded="true" aria-controls="collapseOne">
       ${article.title}
      </button>
     </h2>
     <div id="collapseNews-${key}" class="accordion-collapse collapse" aria-labelledby="headingOne"
      data-bs-parent="#accordionExample">
      <div class="accordion-body">
      ${img}
      ${desc}
      <a href="${article.url}" target="_blank">Read more</a>
      </div>
     </div>
    </div>`;
    });     

    let newsAccordion = document.getElementById('newsAccordion');
    newsAccordion.innerHTML = html;
   }
  }
  else
  {
   console.log('Error here!!');
  }
 }

 /** When request status is changing **/
 xhr.onreadystatechange = function(){
  console.log('ready state is change to ',xhr.readyState);
 }

 /** Send the request **/
 xhr.send();
}