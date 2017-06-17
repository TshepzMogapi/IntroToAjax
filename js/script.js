
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;

    $greeting.text("So, you want to live in " + cityStr +"?")

    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + streetStr + cityStr + "";
    $body.append('<img class="bgimg" src="'+ streetViewUrl + '">');

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=a63190a680a0466d81d35bcdc71ed786'

    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;

        for (var i = 0; i < articles.length; i++)
        {
            var article = articles[i];

            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' +
                article.headline.main + '</a>' +
                '<p>' + article.snippet +'</p>' + '</li>');
        };
    }).fail(function(){
        $nytHeaderElem.text('Articles Not Found');
    });

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("There was a problem loading wikipedia resources");
    }, 8000);

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + cityStr;

    $.ajax({
        url: wikiUrl,
        dataType : "jsonp",
        success : function (re){
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleString = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleString;
                $wikiElem.append('<li><a href="' + url + '">' + articleString + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);

        }
    });

    return false;
};

$('#form-container').submit(loadData);