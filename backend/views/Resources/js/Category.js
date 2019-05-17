$(document).ready(function(){
    $("a.category").on('click', function() {
       
       var category = $('a.category');
        var categories = {category: category.text()};
        console.log(categories);
        console.log(category);
    })
})
