var xmlhttp;
let movieList = [
    {
        "name": "It",
        "year": "2018",
        "url": "https://imgc.allpostersimages.com/img/posters/hellraiser_u-L-F4S78J0.jpg?src=gp&w=275&h=250"
    },
    {
        "name": "Annabelle ",
        "year": "2014",
        "url": "https://m.media-amazon.com/images/M/MV5BMjA1MzIwMjMxNF5BMl5BanBnXkFtZTgwMDQ3NTc2MjI@._V1_.jpg"
    },
    {
        "name": "Kalank",
        "year": "2019",
        "url": "https://m.media-amazon.com/images/M/MV5BYTg4NWEyMjMtNTM2MS00M2I4LWFjOTQtMDRjNjc0ODI3NmY4XkEyXkFqcGdeQXVyOTc1MDE5NzI@._V1_.jpg"
    },
    {
        "name": "Vinci Da",
        "year": "2019",
        "url": "https://timesofindia.indiatimes.com/thumb/msid-68265984,imgsize-153476,width-800,height-600,resizemode-4/68265984.jpg"
    },
    {
        "name": "RAW",
        "year": "2019",
        "url": "https://i2.cinestaan.com/image-bank/1500-1500/143001-144000/143431.jpg"
    },
    {
        "name": "Shazam",
        "year": "2019",
        "url": "https://m.media-amazon.com/images/M/MV5BNzRmNzdmOTUtNDA0MS00Nzc0LTg3ZWYtNmQ2YTU3ZDMzMjM3XkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg"
    },
    {
        "name": "Final Score",
        "year": "2019",
        "url": "https://www1.naijaonpoint.com/wp-content/uploads/2018/10/final_score_naijaonpoint.jpg"
    },
    {
        "name": "Dumbo",
        "year": "2019",
        "url": "http://1017theone.ca/files/2018/06/first-look-at-live-action-dumbo.jpg"
    },
    {
        "name": "No Father in Kashmir",
        "year": "2019",
        "url": "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/04/04/809212-00-kashmir.jpg"
    },
    {
        "name": "Kabir singh",
        "year": "2019",
        "url": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/10/26/Pictures/_261b3c66-d8ea-11e8-997b-9e013cd77a23.JPG"
    }
];

        const getMovieList = () => {
            return new Promise((resolve, reject) => {

                resolve(movieList)
            });
        };

        const renderMovieCards = () => {
            getMovieList().then((response) => {
              
                var items = JSON.parse(localStorage.getItem('movies'));
                let parentContainer = document.getElementsByClassName('list-movies')[0];
                let panel = document.getElementsByClassName('panel')[0];
                items.sort(sortByName('name'));
                for(var i = 0; i < items.length; i++) {
                    var poster = document.createElement("IMG");
                    poster.src = items[i].url;
                    parentContainer.appendChild(poster);       
                    var name = document.createElement("span");
                    name.innerHTML = items[i].name;
                    parentContainer.appendChild(name);
                    var year = document.createElement("p");
                    year.innerHTML = items[i].year;
                    parentContainer.appendChild(year);
                }
            });
        }

        window.onload = function () {
            localStorage.setItem('movies', JSON.stringify(movieList));
            //getMovieList()
            renderMovieCards();
        }
        function reloadPage(){
            window.location.reload();
           
        }

        function addMov(){
            var name = document.getElementById("mnane").value;
            var year = document.getElementById("myear").value;
            var url = document.getElementById("mposter").value;
            console.log(name,year,url);
            movieList.push({
                    "name":name,
                    "year":year,
                    "url":url
                });
            localStorage.setItem('movies', JSON.stringify(movieList));
            movieList = JSON.parse(localStorage.getItem('movies'));
            renderMovieCards();
            
        }

    function getMovieInfo(e) {

        document.getElementsByClassName("list-movies")[0].style="display:none"
        var title = document.getElementById('title').value;
        var url = "http://www.omdbapi.com/?t=" + title + "&apikey=e2c44747&plot=full&r=json";
        //console.log(url);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = processData;
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    }

    function processData() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var movieJSON = xmlhttp.responseText;
            movieJSON = JSON.parse(movieJSON);
            var title = movieJSON.Title;
            var year = movieJSON.Year;
            var posterURL = movieJSON.Poster;

            document.getElementById('poster').src = posterURL;
            document.getElementById('movieTitle').innerHTML = title;
            document.getElementById('movieYear').innerHTML = year;

        }
    }

    var span = document.getElementsByClassName("close")[0];


    function openModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
    }


    function closeModal() {
        var modal = document.getElementById('myModal');
        modal.style.display = "none";
    }


    window.onclick = function (event) {
        var modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    function sortByName(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }