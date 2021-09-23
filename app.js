document.addEventListener('DOMContentLoaded', () => {
  // create an input text box to search videos 

  const btn = document.querySelector("#search-btn");
  const input = document.querySelector("#search-input");

  input.addEventListener("keyup", event => {
    if(event.code === 'Enter'){
      event.preventDefault();
      btn.click();
    }
  });

  btn.addEventListener('click', getVideos);
});

const getVideos = () => {
  // get list of videos
  let query = document.querySelector("#search-input").value;

  if(!query) 
    return;

  let apiKey = 'AIzaSyCy3urUUw1W6kDUZn2sw49iIPgaGgrQmXE';

  fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${apiKey}&order=rating&maxResults=10`)
    .then(data => data.json())
    .then(data => {
      console.log(data);

      const div = document.querySelector('#videos');
      div.innerHTML = "";
      
      for(let video of data.items){

        const iframe = document.createElement('iframe');
        
        iframe.setAttribute('src', `https://www.youtube.com/embed/${video.id.videoId}`)
        iframe.setAttribute('width' , '600');
        iframe.setAttribute('height' , '337.5');
        iframe.setAttribute('style', 'margin: 10px');
        iframe.setAttribute('allowfullscreen', '');

        div.appendChild(iframe);
      }
    });
}