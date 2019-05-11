var idCategory;

function openCity(categoryType, cityName) {
    var i;
    var x = document.getElementsByClassName(categoryType);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    document.getElementById(cityName).style.display = "block"; 
}