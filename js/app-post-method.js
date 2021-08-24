/** Find element **/
let aGetNews = document.getElementById('aGetNews');
aGetNews.addEventListener('click',function(e){
 e.preventDefault();
 aGetNewsFun();
});


function aGetNewsFun()
{
 console.log('* aGetNewsFun *');

 /** Create request object **/
 const xhr = new XMLHttpRequest();

 /** open request object **/
 xhr.open('Post',`http://dummy.restapiexample.com/api/v1/create`,true);
 xhr.getResponseHeader('Content-type', 'application/json');

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
   console.log(this.responseText);
   let response = JSON.parse(this.responseText);
   if(response['status']=='success')
   {
    console.log(response['data']);
    let newsAccordion = document.getElementById('newsAccordion');
    newsAccordion.innerHTML = 'Record is added successfully!';  
   }
   else
   {
    console.log(response);
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
 params = `{"name":"Pardeep1","salary":"123","age":"23"}`;
 xhr.send(params);
}