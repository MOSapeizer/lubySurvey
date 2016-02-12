// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require_self

$("document").ready(survey);

function survey($) {

	$(".start-wrap, .startSurvey").click(function(){
		$('.cover_page').css('display', 'none');
		$('.footer').css('display', 'none');
		$('.container').css('display', 'block');
		$('.submit-wrap').css('display', 'block');

	});
	//提交問卷 1. 檢查有無空白 2. match答案
	$(".submit").click(function (){
		$('.result-A').css('display', 'block');
		$('.questions').css('display', 'none');

		var pika = { 1:0, 2:0, 3:0, 4:0 };
		for( var i=0; i < 3 ; i++ ){
			var chu = $('.pickup')[i].id[1];
			pika[chu]++;
		}

		var max = 0;
		var category = { 1:"A", 2:"B", 3:"C", 4:"D" };
		for( var chu=1; chu <= 4; chu++ ){
			if( pika[chu] > max ){
				max = chu;
			}
		}

		$("#" + category[max]).addClass("active");


	});
	$(".aux").click(function (){
		var columns = {A:2, B:3};
		var questionMark = $(this)[0].id[0];
		var filter = ".aux[id^='" + questionMark + "']";

		$( filter ).removeClass("pickup");
		$( this ).addClass("pickup");


		var questionDone = $('.pickup').length;
		$('.label').text('已回答3個問題中的 ' + questionDone + ' 題。')
		$('.bar > .progress').css('width', 100 / 3 * questionDone + '%');

		//change to next question;
		if( questionMark != 'C' ) {
			console.log("Animate");
			$('html, body').animate({
				scrollTop: $('.columns:nth-child('+ columns[questionMark] +')').offset().top -50
			}, 500);
		}
	});
}