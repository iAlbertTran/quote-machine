var URL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=setQuote";
//var data = $.getJSON(URL, data);

//sets up the quote box on page load
window.onload = function setUp(){
	var script = document.createElement("script");
	script.type = 'text/javascript';
	script.src = URL + "&" + Math.random().toString(16);
	document.body.appendChild(script);
};


//callback function from JSONP
function setQuote(data){
	console.log(data);
	var quoteBox = document.getElementById("quote-box");
	var quote = document.createElement("div");
	quote.id = "quote";
	quote.innerHTML = data[0].content;
	quoteBox.appendChild(quote);
	var author = document.createElement("div");
	author.id = "author";
	author.innerHTML = "- " + data[0].title;
	quote.appendChild(author);
	twitterButton();
}

//creates the tweet button
function twitterButton(){
	var quoteBox = document.getElementById("quote-box");
	var tweet = document.createElement("i");
	tweet.id = "tweet";
	tweet.classList.add("fa");
	tweet.classList.add("fa-twitter");
	quoteBox.appendChild(tweet);
}


//generates a new quote when the raondmize button is clicked
//removes content from the quote box, then fills it with a new quote
function generateQuote(){
	document.body.removeChild(document.body.lastChild);

	var quoteBox = document.getElementById("quote-box");
	quoteBox.innerHTML = "";

	var button = document.createElement("button");
	button.id = "random";
	button.setAttribute("type", "button");
	button.setAttribute("onClick", "generateQuote()");
	button.innerHTML = "Randomize";
	quoteBox.appendChild(button);

	var script = document.createElement("script");
	script.type = 'text/javascript';
	script.src = URL + "&" + Math.random().toString(16);
	document.body.appendChild(script);
}