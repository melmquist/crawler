var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

// var page = 'https://www.thisisanfield.com/2017/09/ben-woodburn-scores-sensational-winner-senior-wales-debut/';
var page = 'https://www.dezeen.com/';
// var page = 'https://arstechnica.com/';

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