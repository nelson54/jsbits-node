var taglines = [
    " is a web developer.",
    " isn't scared of front ends.",
    " works at <a href=\"http://www.englandlogistics.com/\">England Logistics</a>."
];


var codeSelections = [
        "scriptsText/StabWound.txt",
        "scriptsText/BigMoney.txt"
    ],
    codeSelectionsToLoad = codeSelections.length,


    tag = Math.floor(Math.random()*taglines.length);

var codeSelectionNext = function(){
        var selections = $('.code-selection'),
            selected = $('.code-selection.selected');

        if(selected.length == 0)
            selections.first().toggleClass('selected');
        else {
            selected.toggleClass('selected');
            selected.siblings('div.code-selection').first().toggleClass('selected');
        }

    },
    codeHoverHandler = function(e){$('.carousel-control').toggleClass('hover')};

ender.domReady(function(){
    $("header h1").append("<span class=\"tagline\">"+taglines[tag]+"</span>");

    for (var i in codeSelections){

        var url = codeSelections[i];

        $.ajax({
            'url': url,
            'type': 'text',
            'contentType': 'plain/text',
            'success': function( jscript ) {
                var selection = $('<div class="code-selection"></div>'),
                    header = $('<div class="code-header"><a></a></div>'),
                    code = $('<pre><code class="js"></code></pre>');

                $('a',header)
                    .attr('href', url)
                    .text(url);
                $('code', code).append(jscript.responseText)

                selection.append(header);
                selection.append(code);

                $('#code-pane').append(selection);

                if((codeSelectionsToLoad -= 1) == 0){
                    $('#code-pane').append('<a class="right carousel-control" href="javascript:void()" data-slide="next">›</a>')
                    $('#code-pane').removeClass('style').show()//.slideDown(); //jQuery
                    $('a.carousel-control').click(codeSelectionNext).click();
                    hljs.initHighlighting()
                }

            },
            'error': function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus + jqXHR.toString());

                if((codeSelectionsToLoad -= 1) == 0){
                    $('#code-pane', document).append('<a class="right carousel-control" href="javascript:void()" data-slide="next">›</a>')
                    $('#code-pane', document).removeClass('style').show()//.slideDown(); //jQuery
                    $('a.carousel-control').click(codeSelectionNext).click();
                    hljs.initHighlighting()
                }
            }
        })
    }


    $('#code-pane').delegate('.code-selection.selected code', 'mouseenter',codeHoverHandler);
    $('#code-pane').delegate('.code-selection.selected code', 'mouseleave',codeHoverHandler);

    $('body').show();
});