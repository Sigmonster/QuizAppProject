
$(document).ready(function() {
	//Question Data
	var Question1={
	type:"Question 1",
	questionNumber: 1,
	correctAnswer:0,
	contentListData:['<li><img src="img/pic1.jpg" class="contentimg"></li>','<li><img src="img/pic2.jpg" class="contentimg"></li>','<li><img src="img/pic3.jpg" class="contentimg"></li>','<li><img src="img/pic4.jpg" class="contentimg"></li>'],
	chocieListData:['<li><h3><input type="radio" id="radiocheckbox" value="0">A</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="1">B</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="2">C</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="3">D</h3></li>'],
	questionData: "Computer Hardware Question: Which one of the following pictures is Random Access Memory(RAM)?"
	};
	var Question2={
	type:"Question 2",
	questionNumber: 2,
	correctAnswer:2,
	contentListData:['<li><img src="img/pic21.jpg" class="contentimg"></li>','<li><img src="img/pic22.jpg" class="contentimg"></li>','<li><img src="img/pic23.jpg" class="contentimg"></li>','<li><img src="img/pic24.jpg" class="contentimg"></li>'],
	chocieListData:['<li><h3><input type="radio" id="radiocheckbox" value="0">A</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="1">B</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="2">C</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="3">D</h3></li>'],
	questionData: "Computer Hardware Question: Which of the following is a solid state drive(SSD)?"
	};
	var Question3={
	type:"Question 3",
	questionNumber: 3,
	correctAnswer:3,
	contentListData:['<li><img src="img/pic31.jpg" class="contentimg"></li>','<li><img src="img/pic32.jpg" class="contentimg"></li>','<li><img src="img/pic33.jpg" class="contentimg"></li>','<li><img src="img/pic34.jpg" class="contentimg"></li>'],
	chocieListData:['<li><h3><input type="radio" id="radiocheckbox" value="0">A</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="1">B</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="2">C</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="3">D</h3></li>'],
	questionData: "Computer Hardware Question: Which of the following storage mediums have the fastest data transfer rates?"
	};
	var Question4={
	type:"Question 4",
	questionNumber: 4,
	correctAnswer:1,
	contentListData:['<li><h3>ipconfig -f</h3></li>','<li><h3>netstat -a</h3</li>','<li><h3>route print</h3</li>','<li><h3>winfw /listening</h3</li>'],
	chocieListData:['<li><h3><input type="radio" id="radiocheckbox" value="0">A</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="1">B</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="2">C</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="3">D</h3></li>'],
	questionData: "Computer Sofware Question: On a Windows Computer/Server which of the following commands will allow you to see what open ports are listening for inbound connections?"
	};
	var Question5={
	type:"Question 5",
	questionNumber: 5,
	correctAnswer:3,
	contentListData:['<li><h3>ipconfig</h3></li>','<li><h3>show eth0 state</h3</li>','<li><h3>netstat -rn</h3</li>','<li><h3>ifconfig</h3</li>'],
	chocieListData:['<li><h3><input type="radio" id="radiocheckbox" value="0">A</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="1">B</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="2">C</h3></li>','<li><h3><input type="radio" id="radiocheckbox" value="3">D</h3></li>'],
	questionData: "Computer Sofware Question: On a linux server what command would you use to check the network adapter settings(IP Address, Subnet Mask, MAC Address, & other NIC stats)?"
	};
//EndQuestionDATA
//StatCollectionData
	var Stats={
	type:"Stats",
	correctAmount:0,
	questionCount:0,
	percentCorrect:0,
	percentIncorrect:0,
	startTime:null,
	endTime:null 
	};
//Variables
		var answer;
		var correctAnswer;
		var questionCounter;
		var gameProgressionTracker;
		var gameOver;

		newGame();

		$("#game").on("click",".submitbutton",function(){
			/*Debug*/console.log("clicked submitbutton");
			answer = $("#radiocheckbox:checked").val();
			/*Debug*/console.log(answer);
			checkAnswer();
			if (answer > -1){
				determinModalText();
				popUpModal();

			}
		});
		$("#game").on("click",".continueButton",function(){
			/*Debug*/console.log("clicked continue");
			loadNextQuestion();
			removeModal();
			if (gameOver==true)
				finalPage();
		});
		$(".bannerbuttons").on("click",".newGameButton",function(){
			/*Debug*/console.log("clicked NewGame Button!");
			newGame();
		});

//Functions
	function newGame(){
		gameProgressionTracker="NewGame";
		answer=null;
		correctAnswer=null;
		questionCounter=0;
		$("#stat1").text(0);
		$("#stat2").text(0);
		$("#stat3").text(0);
		Stats.startTime=Date();
		determinModalText();
		popUpModal();
		if (gameOver==true)
			$("#overlay-lastpage").hide("slow");
		gameOver=false;
		/*Debug*/console.log(Stats);
	}

	function checkAnswer(){
		if (answer == null){
			alert("Please Select an answer before continuing!")
		}
		else if (answer == correctAnswer){
			statCollection(true);
			return gameProgressionTracker="CorrectAnswer";

		}
		else if (answer != correctAnswer){
			statCollection(false);
			return gameProgressionTracker="IncorrectAnswer";
		}
	}
	function statCollection(collector){
		Stats.questionCount++
		if (collector==true){
			Stats.correctAmount++
		}
		Stats.percentCorrect=((Stats.correctAmount/Stats.questionCount)*100).toFixed(2);
		Stats.percentIncorrect=((Stats.questionCount-Stats.correctAmount)/Stats.questionCount*100).toFixed(2);
		displayStats();
	}
		function displayStats(){
			$("#stat1").text(Stats.questionCount);
			$("#stat2").text(Stats.percentCorrect);
			$("#stat3").text(Stats.percentIncorrect);
		}
	function finalPage(){
		Stats.endTime=Date();
		$("#final1").text(Stats.questionCount);
		$("#final2").text(Stats.percentCorrect);
		$("#final3").text(Stats.percentIncorrect);
		$("#final4").text(Stats.startTime);
		$("#final5").text(Stats.endTime);
		$("#overlay-lastpage").show("slow");

	}
	function removeModal(){
		$("#game-overlay").hide("slow");
	}
	function popUpModal(){
		$("#game-overlay").show("slow");
	}
	function determinModalText(){
		if (gameProgressionTracker=="NewGame"){
			setfeedback("Welcome to my JavaScript game!",'Press continue to start the name. If you ever need help click the "Help?" button at the top of the page!')
		}
		else if (gameProgressionTracker=="CorrectAnswer"){
			setfeedback("Correct!","Nice Job!")
		}
		else if (gameProgressionTracker=="IncorrectAnswer"){
			setfeedback("Incorrect!","Ouch, you missed that one.")
		}
			
	}
	function setfeedback(title,message){
		$("#feedback-title").text(title);
		$("#feedback-message").text(message);
	}
	function loadNextQuestion(){
		if (gameOver==true){
			finalPage();
		}
		questionCounter++;
		var questionNumber= "Question"+questionCounter;
		/*Debug*/console.log(questionNumber);
		$(".choicelist li").remove();
		$(".contentlist li").remove();
		$("#question").empty();
		if (questionNumber=="Question1"){
		/*Debug*/console.log("loadNextQuestion() running");	
			for (var i = 0; i < 4; i++){
			$(".contentlist").append(Question1.contentListData[i]);
			$(".choicelist").append(Question1.chocieListData[i]);
			}
		correctAnswer = Question1.correctAnswer;
		$("#question").html(Question1.questionData)
		}
		if (questionNumber=="Question2"){
		/*Debug*/console.log("loadNextQuestion() running");	
			for (var i = 0; i < 4; i++){
			$(".contentlist").append(Question2.contentListData[i]);
			$(".choicelist").append(Question2.chocieListData[i]);
			}
		correctAnswer = Question2.correctAnswer;
		$("#question").html(Question2.questionData)
		}
		if (questionNumber=="Question3"){
		/*Debug*/console.log("loadNextQuestion() running");	
			for (var i = 0; i < 4; i++){
			$(".contentlist").append(Question3.contentListData[i]);
			$(".choicelist").append(Question3.chocieListData[i]);
			}
		correctAnswer = Question3.correctAnswer;
		$("#question").html(Question3.questionData)
		}
		if (questionNumber=="Question4"){
		/*Debug*/console.log("loadNextQuestion() running");	
			for (var i = 0; i < 4; i++){
			$(".contentlist").append(Question4.contentListData[i]);
			$(".choicelist").append(Question4.chocieListData[i]);
			}
		correctAnswer = Question4.correctAnswer;
		$("#question").html(Question4.questionData)
		}
		if (questionNumber=="Question5"){
		/*Debug*/console.log("loadNextQuestion() running");	
			for (var i = 0; i < 4; i++){
			$(".contentlist").append(Question5.contentListData[i]);
			$(".choicelist").append(Question5.chocieListData[i]);
			}
		correctAnswer = Question5.correctAnswer;
		$("#question").html(Question5.questionData)
		gameOver=true;
		}
		/*Debug*/console.log("loadNextQuestion() Done!");
	}



});