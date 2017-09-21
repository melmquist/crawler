var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

// var page = 'https://www.thisisanfield.com/2017/09/ben-woodburn-scores-sensational-winner-senior-wales-debut/';
// var page = 'https://www.dezeen.com/';
// var page = 'https://arstechnica.com/';
// var page = 'http://www.tmz.com/2017/09/20/kevin-hart-extortion-case-sex-tape-search-warrants/?adid=hero1/';
// var page = 'https://www.nytimes.com/2017/09/01/us/politics/russia-election-hacking.html?_r=1';
var page = 'http://nypost.com/2017/09/20/landon-collins-starts-twitter-feud-with-bully-lions-tight-end/';

console.log("visiting => ", page);

request(page, (error, response, body) => {
    if (error) {
        console.log("error: ", error)
    }
    console.log('status code: ' + response.statusCode);

    if (response.statusCode === 200) {
        var $ = cheerio.load(body);
        // console.log("$", $)
        console.log("page title: " + $('title').text());
        collectInternalLinks($)
    }
})

function searchForWord($, word) {
    var bodyText = $('html > body').text();

    if (bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
        return true
    }
    return false;
}

function collectInternalLinks($) {
    let allRelativeLinks = [];
    let allAbsoluteLinks = [];

    var relativeLinks = $("a[href^='/']");
    relativeLinks.each(function() {
        allRelativeLinks.push($(this).attr('href'))
    });

    var absoluteLinks = $("a[href^='http']");
    absoluteLinks.each(function() {
        allAbsoluteLinks.push($(this).attr('href'));
    })

    console.log('Found ' + allRelativeLinks.length + ' relative links');
    console.log("Found " + allAbsoluteLinks.length + " absolute links");
    console.log('allRelativeLinks:  ', allRelativeLinks);
    console.log('allAbsoluteLinks:  ', allAbsoluteLinks);
}

/*
notes... 
need to find a use case where 1 article is used as an exact linked source in at least 1 other article

nytimes?

russions hacking election new 
https://www.nytimes.com/2017/09/01/us/politics/russia-election-hacking.html?_r=1

mentions of the above article (via google search for the NYTimes article TITLE)
https://twitter.com/ritholtz/status/904294918478233600
https://www.youtube.com/watch?v=I6jXvU4sYjY
https://www.reddit.com/r/SandersForPresident/comments/6xifmx/russian_election_hacking_efforts_wider_than/
http://raymcgovern.com/2017/09/02/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/
http://www.titansreport.com/topic/28543-russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/
https://www.scoopnest.com/user/maggieNYT/903777111072272384-russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-
http://newsdiffs.org/diff/1471230/1471341/https%3A/www.nytimes.com/2017/09/01/us/politics/russia-election-hacking.html
http://newyork.trendolizer.com/2017/09/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-the-new-york-times.html
http://famoustechnews.com/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-new-york-times/
http://www.romanianews.online/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/



other considerations:
given this one starting article...
what other articles mention the authors of this article?
what other articles mention the title of this article?
what other articles link to this article?
what other articles link to the root publication that this article came from?
what other articles mention or use actual verbiage taken from this article? (and also hit one of these above conditions)
    analyze verbiage from this article, key words, novel phrases (use NLP/AI to figure out what is special in the text)

ALL LOOKING TO GET TOWARDS: 
    What defines a connection? ie to be able to say with x% of certainty, this article/post/video was referencing this one that came before it
    with an network of connections, and folding in time of publication for each, you can arrive at data for a flow/spider chart



so we start with user intering an article... this service will tell them what other articles are connected to it, if it should have sourced citations or if it was sourced as a citation in others

HOW TO BUILD A SEARCH ENGINE WITH JS
https://www.google.com/search?q=how+to+build+a+search+engine+in+javascript&oq=how+to+build+a+search+engine+in+java&aqs=chrome.1.69i57j0l5.8085j0j1&sourceid=chrome&ie=UTF-8

****NODE AND ELASTIC SEARCH
https://www.sitepoint.com/search-engine-node-elasticsearch/




OTHER OPTIONS???
trump lawyer 
https://www.nytimes.com/2017/08/28/us/politics/trump-tower-putin-felix-sater.html?rref=collection%2Fbyline%2Fmatt-apuzzo&action=click&contentCollection=undefined&region=stream&module=stream_unit&version=latest&contentPlacement=1&pgtype=collection&_r=0

*/

/*
notes... 
need to find a use case where 1 article is used as an exact linked source in at least 1 other article

nytimes?

russions hacking election new 
https://www.nytimes.com/2017/09/01/us/politics/russia-election-hacking.html?_r=1

mentions of the above article (via google search for the NYTimes article TITLE)
https://twitter.com/ritholtz/status/904294918478233600
https://www.youtube.com/watch?v=I6jXvU4sYjY
https://www.reddit.com/r/SandersForPresident/comments/6xifmx/russian_election_hacking_efforts_wider_than/
http://raymcgovern.com/2017/09/02/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/
http://www.titansreport.com/topic/28543-russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/
https://www.scoopnest.com/user/maggieNYT/903777111072272384-russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-
http://newsdiffs.org/diff/1471230/1471341/https%3A/www.nytimes.com/2017/09/01/us/politics/russia-election-hacking.html
http://newyork.trendolizer.com/2017/09/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-the-new-york-times.html
http://famoustechnews.com/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny-new-york-times/
http://www.romanianews.online/russian-election-hacking-efforts-wider-than-previously-known-draw-little-scrutiny/



other considerations:
given this one starting article...
what other articles mention the authors of this article?
what other articles mention the title of this article?
what other articles link to this article?
what other articles link to the root publication that this article came from?
what other articles mention or use actual verbiage taken from this article? (and also hit one of these above conditions)
    analyze verbiage from this article, key words, novel phrases (use NLP/AI to figure out what is special in the text)

ALL LOOKING TO GET TOWARDS: 
    What defines a connection? ie to be able to say with x% of certainty, this article/post/video was referencing this one that came before it
    with an network of connections, and folding in time of publication for each, you can arrive at data for a flow/spider chart



so we start with user intering an article... this service will tell them what other articles are connected to it, if it should have sourced citations or if it was sourced as a citation in others

HOW TO BUILD A SEARCH ENGINE WITH JS
https://www.google.com/search?q=how+to+build+a+search+engine+in+javascript&oq=how+to+build+a+search+engine+in+java&aqs=chrome.1.69i57j0l5.8085j0j1&sourceid=chrome&ie=UTF-8

****NODE AND ELASTIC SEARCH
https://www.sitepoint.com/search-engine-node-elasticsearch/




OTHER OPTIONS???
trump lawyer 
https://www.nytimes.com/2017/08/28/us/politics/trump-tower-putin-felix-sater.html?rref=collection%2Fbyline%2Fmatt-apuzzo&action=click&contentCollection=undefined&region=stream&module=stream_unit&version=latest&contentPlacement=1&pgtype=collection&_r=0

*/