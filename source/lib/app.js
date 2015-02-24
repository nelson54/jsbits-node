var taglines = [
    " is a web developer.",
    " isn't scared of front ends.",
    " works at <a href=\"http://www.learninga-z.com/\">Learning A-Z</a>."
];


var tag = Math.floor(Math.random()*taglines.length);


ender.domReady(function(){
    $("header h1").append("<span class=\"tagline\">"+taglines[tag]+"</span>");


    $('body').show();
});
