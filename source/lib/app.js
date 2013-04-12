var taglines = [
    " is a web developer.",
    " loves writing Javascript.",
    " is really into the internet.",
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

$(document).ready(function(){
    $("header h1").append("<span class=\"tagline\">"+taglines[tag]+"</span>");

    for (var i in codeSelections){

        var url = codeSelections[i];

        jQuery.ajax({
            'url': url
        }).done(function( jscript ) {
                var selection = $('<div class="code-selection"></div>'),
                    header = $('<div class="code-header"><a></a></div>'),
                    code = $('<pre><code class="js"></code></pre>');

                $('a',header)
                    .attr('href', url)
                    .text(url);
                $('code', code).append(jscript)

                selection.append(header);
                selection.append(code);

                jQuery('#code-pane').append(selection);

                if((codeSelectionsToLoad -= 1) == 0){
                    jQuery('#code-pane').append('<a class="right carousel-control" href="javascript:void()" data-slide="next">›</a>')
                    jQuery('#code-pane').removeClass('style').slideDown();
                    $('a.carousel-control').click(codeSelectionNext).click();
                    hljs.initHighlightingOnLoad();
                }

            }).fail(function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus + jqXHR.toString());

                if((codeSelectionsToLoad -= 1) == 0){
                    jQuery('#code-pane', document).append('<a class="right carousel-control" href="javascript:void()" data-slide="next">›</a>')
                    jQuery('#code-pane', document).removeClass('style').slideDown();
                    $('a.carousel-control').click(codeSelectionNext).click();
                    hljs.initHighlightingOnLoad();
                }
            });
    }

    $('#code-pane').delegate('.code-selection.selected code', 'mouseenter',codeHoverHandler);
    $('#code-pane').delegate('.code-selection.selected code', 'mouseleave',codeHoverHandler);

    $(".right-pane").tweet({
        username: 'dereknelson01',
        join_text: 'auto',
        avatar_size: 32,
        count: 3,
        auto_join_text_default: '',
        auto_join_text_ed: '',
        auto_join_text_ing: '',
        auto_join_text_reply: '',
        auto_join_text_url: '',
        loading_text: 'loading tweets...'
    });

    $('body').show();
});