# MARKDOWN
Body text -- `mono text`

## PRE
    $ do `it`

### UL
* [spot link](http://site/) `(http://site/)`
* [named link][site] `[site]`

#### OL
0. 0
0. 0

[site]: http://site/

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

Using advice from @Daniel Pryden's...

    I thought - why not create the website in an old fashioned manner,
    actual pages and everything but then perform the following steps.

    1   Intercept all internal links on the homepage using jQuery
        and prepend a hash (#) before the window.location.pathname,
        thus triggering the hashchange event. (see step 3)

    2   Add a javascript redirect on all pages to the homepage,
        but append the window.location.pathname after a hash (#).
        Google crawls http://www/aboutus
        A user sees http://www/#/aboutus

    3   On the homepage, use jQuery BBQ or a similar listen for
        the hashchange event (and includes when the page loads)
        so that dynamic content can be loaded.
        [Umbraco can be configured to serve partial or full page content
         based on whether the request is an AJAX one or not.]

    Without Javascript users will have a full (semi-good-looking) website,
    Google will crawl all of the pages without any issues,
    but users with Javascript will always stay on the homepage
    - and the cool concept of having a Web App will be accomplished.

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

CLIENT SIDE: There are two things to do here.

    1 INTERCEPT: Intercept the click of every link with jQuery:

            $('body').on('click', 'a', function(event){
                var href = $(this).attr('href');

                if (href[0] == '/'){
                    event.preventDefault();
                    location.hash = '#!' + href;
                }
            });

        The code checks if the link goes to a local resource and if so,
        stops it from acting but changes the Resource Identifier instead.

    2 ROUTE: Listen for route changes and act accordingly. With pathJS:

            Path.default(function(){
                $.get(location.hash.replace('#!', ''), function(data){
                    $('#contents').html(data);
                });
            });
            Path.listen();

        Local links are routed to the default function.

        This function does an AJAX call to get new content and injects it
        [without the layout, if server side controller serves pure data]

    If JavaScript is disabled, the links will never be intercepted,
    and will go to your regular routes, returned with the layout intact.
# MARKDOWN
Body text -- `mono text`

## PRE
    $ do `it`

### UL
* [spot link](http://site/) `(http://site/)`
* [named link][site] `[site]`

#### OL
0. 0
0. 0

[site]: http://site/

