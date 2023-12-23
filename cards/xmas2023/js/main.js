// TweenMax.set("#mainSVG", {/**/x:0, y:0, transformOrigin:"0 0"});


var music;
var stage;
var recipient;
var queryString;
var stars = new Array();
const smallStarBackSVG = '29.02 8.69 18.86 16.14 18.86 16.14 8.69 8.69 16.14 18.86 8.69 29.02 18.86 21.57 29.02 29.02 21.57 18.86 21.57 18.86 29.02 8.69';
const smallStarFrontSVG = '37.71 18.86 21.37 16.34 21.37 16.34 18.86 0 16.34 16.34 0 18.86 16.34 21.37 18.86 37.71 21.37 21.37 21.37 21.37 37.71 18.86';

const tl = new TimelineMax({paused: true});

Math.random = RNG.prototype.uniform.bind(new RNG('4d6 + 12.17'));
Math.randMinMax=function(t,n,a){var r=t+Math.random()*(n-t)
return a&&(r=Math.round(r)),r}

const starsNum = 80;

const card =  function() {
	recipient = 
	stage = $('#stage');
	music = document.getElementById("music");
	music.preload = "auto";
	TweenMax.set(['#stage','#stars', "#star", '#topStar', '#twinkle', '#extraTwinkle1', '#extraTwinkle12', '#landscape', '#lsMidHolder', '#lsForeHolder', '#lsBgHolder', "#wm", "#wm1", "#wm1Body", "#wm1Head","#wm","#wm2","#wm2Body","#wm2Head","#wm","#wm3","#wm3Body","#wm3Head", "#wmmjc", '#fighter', '#mjcHolder'], {transformOrigin:"50% 50%"});
	setMainStar();
	createStarField();
	addSVGText(writeGreeting(), 'introText', 'intro');
	TweenMax.set(['#introText', '#endText'], {transformOrigin:"50% 50%"});
	TweenMax.set('#introText', {y:'-50'});
	addSVGText(writeEnd(), 'endText', 'end');
	$('#intro').addEventListener('click', playCard);
	TweenMax.set(["#stage", '#cont'], {transformOrigin:"0 0", x:0, y:0});
	TweenMax.set(["#stage", '#cont'], {transformOrigin:"0 0", x:0, y:0});
	setTL();
	tl.pause(0.001);
}

const setMainStar = function(){
	
	TweenMax.set(['#wm1Zoom', '#wm2Zoom', '#wm3Zoom'], {transformOrigin:"50% 20%"});
	TweenMax.set(['#topStar'], {transformOrigin:"50% 207.48px"});
	TweenMax.set("#star", {alpha: 0, scale:0.6});
	TweenMax.set('#landscape', {x:-1438})
	TweenMax.to('#extraTwinkle12', 0.65, {scale:0.84, yoyo:true, repeat:-1, ease: -1});
	TweenMax.to('#extraTwinkle1', 0.6, {scale:0.85, yoyo:true, repeat:-1, ease: -1, delay: .2});
	TweenMax.to('#twinkle', 0.7, {scale:0.9, yoyo:true, repeat:-1, ease: -1, delay: .4});
	TweenMax.to('#topStar', 1.2, {scale:1.1, yoyo:true, repeat:-1, ease: -1});
	TweenMax.set("#cont", {autoAlpha: 1});
}

const createStarField = function () {
	let target = $('#starField');
	let tv = new Array();
	for(var i = 0; i<starsNum; i++){
		
		stars[i] = document.createElementNS(target.namespaceURI,"g");
		let starBG = document.createElementNS(target.namespaceURI,"polygon");
		starBG.setAttribute("points", smallStarBackSVG);
		starBG.setAttribute("class", "strokeFillStar");

		let starFG = document.createElementNS(target.namespaceURI,"polygon");
		starFG.setAttribute("points", smallStarFrontSVG);
		starFG.setAttribute("class", "strokeFillStar");
		stars[i].appendChild(starBG);
		stars[i].appendChild(starFG);
		tv[i] = new Array();
		tv[i][0] = Math.randMinMax(0.65, 1);
		tv[i][1] = Math.randMinMax(0.65, 1.1);
		tv[i][2] = starBG

		stars[i].id = 'stars' + i;
		// stars[i].innerHTML = smallStarSVG;
		TweenMax.set(stars[i], {
			scale: Math.randMinMax(0.1, 1),
			x : Math.randMinMax(-1280, 1280),
			y : Math.randMinMax(-320, 1000)
		})


		target.appendChild(stars[i]);

		TweenMax.set(starBG, {transformOrigin:"50% 50%"})
		console.log("tv: " + tv);
		TweenMax.to(tv[i][2], tv[i][0], {scale:tv[i][0], yoyo:true, repeat:-1});

	}
}

const getGet = function(varName) {

	queryString = window.location.search;

	var urlParams = new URLSearchParams(queryString);

	var value = urlParams.get(varName);
	if(varName=='recipient' && value==null) value="Human";
	else if(varName =='sender' && value==null) value="Magnus";
	console.log('value' + value);
	return  value;

}

const setTL = function(){
	var starIn = 1.5;
	var starZoom1 = 3.5;
	var starZoomD = 2;
	var firstZoomIn = 6.5;
	var firstZoomD = 3;

	var firstFadeOut = 12.5;

	var fighterOn = 25;
	var mjcOn = 35



	// tl.set('#fighter', {autoAlpha: 1, /*x:120,*/ scale:0.1},0);
	tl.set('#landscape', {y:280}, 0)
	tl.set(['#intro',], {y:-220}, 0)
	tl.set(['#end'], {y:-300}, 0)
	tl.to('#intro', 2, {autoAlpha: 0}, 0);
	tl.to('#star', 2, {autoAlpha: 1}, starIn);
	tl.to('#stars', starZoomD, {scale: 0.35, y:-100, ease: "power2.in"}, starZoom1);
	tl.to('#landscape', starZoomD, {y:50}, starZoom1);
	

	tl.to('#stars', firstZoomD, {y:-240, x:120, ease: "power2.in"}, firstZoomIn);
	tl.to('#landscape', firstZoomD, {scale: 0.35, y:-400, ease: "power2.in"}, firstZoomIn);
	tl.from('#wm', firstZoomD, {scale:0.1, y:100, ease: "power2.in"}, firstZoomIn);
	tl.from('#wm', 0.5, {autoAlpha:0}, firstZoomIn);

	tl.to(['#stars', '#landscape', '#wm'], 1, {autoAlpha: 0}, firstFadeOut);

	tl.from('#wm1Zoom', 0.5, {autoAlpha: 0});
	tl.to('#wm1Zoom', 3.5, {scale:1.1}, '-=0.5');
	tl.to('#wm1Zoom', 0.5, {autoAlpha: 0}, '-=0.5');
	tl.from('#wm2Zoom', 0.5, {autoAlpha: 0});
		tl.to('#wm2Zoom', 3.5, {scale:1.1}, '-=0.5');
	tl.to('#wm2Zoom', 0.5, {autoAlpha: 0}, '-=0.5');
	tl.from('#wm3Zoom', 0.5, {autoAlpha: 0});
		tl.to('#wm3Zoom', 3.5, {scale:1.1}, '-=0.5');
	tl.to('#wm3Zoom', 0.5, {autoAlpha: 0}, '-=0.5');

	tl.set('#landscape', {y:100, x:-1350, scale:1})

	tl.to(['#stars', '#landscape'], 1, {autoAlpha: 1.5});


	tl.from('#fighter', 0.2, {autoAlpha:0}, fighterOn);

	tl.fromTo('#fighter', 3, {scale: 0.27, x:180, ease: "power4.out"}, {scale:4, x:-1200}, fighterOn);
	tl.to('#fighter', 0.25, {autoAlpha:0}, '-=0.25')
	tl.to('#landscape', 2, {scale: 3, y:1300, x:-1300})
	tl.to(['#stars', '#landscape'], 1, {autoAlpha:0})
	tl.from('#mjcHolder', 1, {autoAlpha:0})
	tl.from('#mjcHolder', 5, {scale: 0.1})
	tl.set('#wm', {y:-80})
	tl.to('#wm', 2, {autoAlpha:1}, '+=2')
	tl.to(['#wmmjc'], 1, {scale:0.55, y:125})
	tl.from(['#end'], 1, {autoAlpha:0})

}

const playCard = function(){
	console.log('start');
	music.play();
	tl.play();
}	

const writeGreeting = function(){
	const greeting = 'Dear ' + getGet("recipient") + ', <br/>Please click here to view your Christmas Card.<br/>This presentation uses sound.<br/>Please use headphones or enable a speaker.';
	return greeting
}
const writeEnd = function(){
	const greeting = 'Dear ' + getGet("recipient") + ', <br/>Wishing you a very Merry Christmas.<br/>Peace and goodwill to all. Everyone. <br/>Every Single soul, human, animal and plant.<br/>Across the world and the Universe.<br/>Love,<br/>'+getGet("sender");
	return greeting
}

const writeText = function(text,target){
	var lines = text.split('<br/>');
	for(var i=0;i<lines.length;i++){
		let newLine = document.createElementNS(target.namespaceURI,"tspan");
		newLine.setAttribute("dy", '2em');
		newLine.setAttribute("x", '0');
		newLine.textContent = lines[i];
	}
}

const addSVGText = function (text, svg, id){
	var target;
	if(svg==null) target = stage;
	else target = $('#' + svg);

	let cont = $('#guide').getBBox();
	let x = cont.x + cont.width * 0.5;
	let y = cont.y + cont.height * 0.5;

	var textElem = document.createElementNS(target.namespaceURI,"text");
	textElem.setAttribute("x", x);
	textElem.setAttribute("y", y);

	textElem.classList.add("cText");

	var lines = text.split('<br/>');
	for(var i=0;i<lines.length;i++){
		let newLine = document.createElementNS(target.namespaceURI,"tspan");
		newLine.setAttribute("dy", '1.5em');
		newLine.setAttribute("x", '50%');
		newLine.textContent = lines[i];
		textElem.appendChild(newLine);
	}

	textElem.id = id;

	target.appendChild(textElem);
}

const init = function () {
    card();
}

window.addEventListener('load', init);
window.$=function(e,t,l){var n={"#":"getElementById",".":"getElementsByClassName","@":"getElementsByName","=":"getElementsByTagName","*":"querySelectorAll"}[e[0]],m=(t===l?document:t)[n](e.slice(1));return m.length<2?m[0]:m};window.Element.prototype.find=function(selector){return $(selector, this);};