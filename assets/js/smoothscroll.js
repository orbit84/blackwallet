// Select all links with hashes
$('a[href*="#"]')
        .click(function(event)
        {
                $('body')
                        .animate(
                        {
                                scrollTop: 0
                        }, 300);

        });
