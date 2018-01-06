var URL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=setQuote";
//var data = $.getJSON(URL, data);

//sets up the quote box on page load
window.onload = function setUp(){

	var quoteBox = document.getElementById("quote-box");
	var rect = quoteBox.getBoundingClientRect();
	var arrow = document.getElementById("arrow");
	arrow.style.top = rect.bottom + "px";
	arrow.style.left = rect.left + "px";

	var script = document.createElement("script");
	script.type = 'text/javascript';
	script.src = URL + "&" + Math.random().toString(16);
	document.body.appendChild(script);
	twitterButton();
};

//adjust the position of the speach bubble arrow
window.onresize = function adjust(){
	var quoteBox = document.getElementById("quote-box");
	var rect = quoteBox.getBoundingClientRect();
	var arrow = document.getElementById("arrow");

	//minus 5 and plus 8 px respectively to get the arrow at the very bottom right corner 
	arrow.style.top = rect.bottom + "px";
	arrow.style.left = rect.left + "px";
}

//callback function from JSONP
function setQuote(data){
	var quoteBox = document.getElementById("quote-box");
	var quote = document.createElement("div");
	quote.id = "quote";

	var string = data[0].content.split("");
	//replace "<p>" at the beginning and end of the string with "<em>" and double quotes.
	string.splice(1,2,"em>\"");
	string.splice(string.length-5, 3, "\"<em");
	quote.innerHTML = string.join("");

	//insert quote in middle
	var tweetButton = document.getElementById("tweet");
	quoteBox.insertBefore(quote, tweetButton);

	//creates div for name of author behind quote
	var author = document.createElement("div");
	author.id = "author";
	author.innerHTML = "- " + data[0].title;
	quote.appendChild(author);
}

//creates the tweet button
function twitterButton(){
	var quoteBox = document.getElementById("quote-box");
	var tweet = document.createElement("i");
	tweet.id = "tweet";
	tweet.classList.add("fa");
	tweet.classList.add("fa-twitter");
	tweet.classList.add("fa-2x");
	quoteBox.parentNode.insertBefore(tweet, quoteBox.nextSibling);
}


//generates a new quote when the raondmize button is clicked
//removes content from the quote box, then fills it with a new quote
function generateQuote(){
	document.body.removeChild(document.body.lastChild);

	var quoteBox = document.getElementById("quote-box");
	quoteBox.removeChild(document.getElementById("quote"));
    

	var script = document.createElement("script");
	script.type = 'text/javascript';
	script.src = URL + "&" + Math.random().toString(16);
	document.body.appendChild(script);
}