var map = L.map('main_map').setView([6.2488638,-75.5824258], 13);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
//   attribute: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map)


// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

// }).addTo(map);



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGF0YWtlcjAxIiwiYSI6ImNrY3JlOHZvczFjY28yc28ydzhtbTc0cmwifQ.6aMmLb1qmFQ9vawNiapfpw'
}).addTo(map);


$.ajax({
    dataType:"json",
    url:"api/bicicletas",
    success: function(result){
        console.log(result)
        result.bicicletas.forEach((bici) => {
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map)
        })
    }
})