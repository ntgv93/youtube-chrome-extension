let videoIds = [];
let currentPage = 0;

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector("#search-btn");
  const prevPageBtn = document.querySelector('#prev-page-btn');
  const nextPageBtn = document.querySelector('#next-page-btn');
  const input = document.querySelector("#search-input");

  input.addEventListener("keyup", event => {
    if(event.code === 'Enter'){
      event.preventDefault();
      btn.click();
    }
  });

  btn.addEventListener('click', getVideos);
  prevPageBtn.addEventListener('click', getPrevPage);
  nextPageBtn.addEventListener('click', getNextPage);
});

const getVideos = () => {
  let query = document.querySelector("#search-input").value;

  if(!query) 
    return;

  let apiKey = 'AIzaSyCy3urUUw1W6kDUZn2sw49iIPgaGgrQmXE';

  fetch(`https://www.googleapis.com/youtube/v3/search?q=${query}&key=${apiKey}&order=rating&maxResults=50`)
    .then(data => data.json())
    .then(data => {
      videoIds = data.items.slice();

      const div = document.querySelector('#videos');
      div.innerHTML = "";
      
      for(let i = 0; i < 10; i++){
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${data.items[i].id.videoId}`)
        iframe.setAttribute('width' , '600');
        iframe.setAttribute('height' , '337.5');
        iframe.setAttribute('style', 'margin: 10px');
        iframe.setAttribute('allowfullscreen', '');
        div.appendChild(iframe);
      }

      let nextPageBtn = document.getElementById('next-page-btn');
      nextPageBtn.style.display ='inline';
      nextPageBtn.innerHTML = 'next';
    });
}
  
const getNextPage = () => {
  window.scrollTo(0, 0);

  currentPage++;
  
  const div = document.querySelector('#videos');
  div.innerHTML = "";
  
  let lowerBound = currentPage * 10;
  let upperBound = lowerBound + 10;

  for(let i = lowerBound; i < upperBound; i++){
    const iframe = document.createElement('iframe');
    console.log(videoIds[i]);
    
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoIds[i].id.videoId}`)
    iframe.setAttribute('width' , '600');
    iframe.setAttribute('height' , '337.5');
    iframe.setAttribute('style', 'margin: 10px');
    iframe.setAttribute('allowfullscreen', '');
    div.appendChild(iframe);
  }
  
  let prevPageBtn = document.getElementById('prev-page-btn');
  prevPageBtn.style.display ='inline';
  prevPageBtn.innerHTML = 'prev.';
  
  let nextPageBtn = document.getElementById('next-page-btn');
  nextPageBtn.style.display = currentPage !== 4 ? 'inline' : 'none';
  console.log(currentPage);
  console.log(nextPageBtn.style.display);
  nextPageBtn.innerHTML = 'next';
}

const getPrevPage = () => {
  window.scrollTo(0, 0);

  currentPage--;

  const div = document.querySelector('#videos');
  div.innerHTML = "";

  let lowerBound = currentPage * 10;
  let upperBound = lowerBound + 10;

  for(let i = lowerBound; i < upperBound; i++){
    const iframe = document.createElement('iframe');
    
    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoIds[i].id.videoId}`)
    iframe.setAttribute('width' , '600');
    iframe.setAttribute('height' , '337.5');
    iframe.setAttribute('style', 'margin: 10px');
    iframe.setAttribute('allowfullscreen', '');
    div.appendChild(iframe);
  }

  let prevPageBtn = document.getElementById('prev-page-btn');
  prevPageBtn.style.display = currentPage !== 0 ? 'inline' : 'none';
  prevPageBtn.innerHTML = 'prev.';

  let nextPageBtn = document.getElementById('next-page-btn');
  nextPageBtn.style.display ='inline';
  nextPageBtn.innerHTML = 'next';
}