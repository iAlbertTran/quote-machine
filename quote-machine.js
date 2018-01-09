var URL = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=setQuote";
var quoteBank = [];
var authorBank = [];
var currentQuote = -1;
//var data = $.getJSON(URL, data);

//sets up the quote box on page load
window.onload = function setUp(){

	var script = document.createElement("script");
	script.type = 'text/javascript';
	script.src = URL + "&" + Math.random().toString(16);
	document.body.appendChild(script);

	var quoteBox = document.getElementById("quote-box");
	var rect = quoteBox.getBoundingClientRect();
	var arrow = document.getElementById("arrow");
	arrow.style.top = rect.bottom - 20 + "px";
	arrow.style.left = rect.left + "px";
	
	twitterButtonPosition();
};

//adjust the position of the speach bubble arrow
window.onresize = function adjust(){
	var quoteBox = document.getElementById("quote-box");
	var rect = quoteBox.getBoundingClientRect();
	var arrow = document.getElementById("arrow");

	arrow.style.top = rect.bottom + "px";
	arrow.style.left = rect.left + "px";


	twitterButtonPosition();
}

//callback function from JSONP
function setQuote(data){
	var quote = document.getElementById("quote");

	var string = data[0].content.split("");
	//replace "<p>" at the beginning and end of the string with "<em>" and double quotes.
	string.splice(1,2,"em>\"");
	string.splice(string.length-5, 3, "\"<em");
	quote.innerHTML = string.join("");
	quoteBank.push(string.join(""));

	//creates div for name of author behind quote
	var author = document.createElement("author");
	author.innerHTML = data[0].title;
	author.id = "author";

	quote.appendChild(author);

	authorBank.push(data[0].title);

	currentQuote += 1;
}

//creates the tweet button
function twitterButtonPosition(){

	var arrow = document.getElementById("arrow");
	var arrowPosition = arrow.getBoundingClientRect();
	tweet.style.top = arrowPosition.bottom + "px";
	tweet.style.left = arrowPosition.left - 75 + "px";
}


//generates a new quote if all previous quotres were cycled through
//removes content from the quote box, then fills it with a new quote
//goes to the following quote if, not all previous quotes are cycled through
function nextQuote(){

	var prevQuoteButton = document.getElementById("prev");
	prevQuoteButton.style.visibility = "visible";

	if(currentQuote == quoteBank.length - 1){
		var script = document.createElement("script");
		script.type = 'text/javascript';
		script.src = URL + "&" + Math.random().toString(16);
		document.body.appendChild(script);
	}

	else{
		var quote = document.getElementById("quote");
		quote.innerHTML = quoteBank[currentQuote + 1];

		var author = document.createElement("author");
		author.id = "author";
		author.innerHTML = authorBank[currentQuote + 1];
		
		quote.appendChild(author);

		currentQuote += 1;

		if(currentQuote == quoteBank.length - 1){
			var nextQuoteButton = document.getElementById("next");
			nextQuoteButton.innerHTML = "New Quote";
		}
	}
	changeColor();
}


//deals with the previous quote button when it is clicked
function prevQuote(){
	var nextQuoteButton = document.getElementById("next");
	nextQuoteButton.style.visibility = "visible";
	nextQuoteButton.innerHTML = "Next Quote";

	var quote = document.getElementById("quote");
	quote.innerHTML = quoteBank[currentQuote - 1];

	var author = document.createElement("author");
	author.id = "author";
	author.innerHTML = authorBank[currentQuote - 1];

	quote.appendChild(author);


	currentQuote -= 1;

	if(currentQuote == 0){
		var previousQuoteButton = document.getElementById("prev");
		prev.style.visibility = "hidden";
	}
	changeColor();

}

function changeColor(){
	var redVal = Math.floor((Math.random() * 255) + 1);
	var greenVal = Math.floor((Math.random() * 255) + 1);
	var blueVal = Math.floor((Math.random() * 255) + 1);

	var rgb = "rgb(" + redVal + "," + greenVal + "," + blueVal + ")";

	var quoteBox = document.getElementById("quote-box");
	var arrow = document.getElementById("arrow");

	quoteBox.style.backgroundColor = rgb;
	arrow.style.borderColor = rgb + " transparent";
}