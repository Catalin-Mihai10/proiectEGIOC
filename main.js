var gl, matrixOfCuboids, linesOfCuboids;
var countA = 0;
var countD = 0;
var startPageFlag = false;
function main(){

	var canvas = document.querySelector('#canvasSurface');
	var renderer = new THREE.WebGLRenderer({canvas, antialias: true});

	//schimbam dimensiunile canvas-ului pentru claritate
	resizeWindow(canvas);

	//cream scena in care pozitionam obiectele
	var scene = createScene();
	
	//adaugam iluminarea in scena
	addLightingToTheScene(scene);

	//cream matricea de cuboizi
	matrixOfCuboids = createMatrixOfCuboids(scene);
	matrixOfLines = createMatrixOfLines(scene);

	//cream camera si tabilim pozitia la care se afla
	var camera = createCamera(gl.canvas.width, gl.canvas.height);
	camera.lookAt(camera.position);

	//cream player-ul
	var player = createPlayer(scene);
	var outlinePlayer = createPlayerEdge(scene);

	//verificam daca unul dintre butuoanele A sau D au fost apasate
	document.body.appendChild(renderer.domElement);

	document.addEventListener("keydown", OnDocumentKeyDown, false);
	function OnDocumentKeyDown(event){
		if(wasRestarted == true){
			countD = 0;
			countA = 0;
			wasRestarted = false;	
		}

		var keyCode = event.which;
		if(keyCode == 65){
			if(countA < 2){
				countD = countD - 1;
				countA = countA + 1;
				outlinePlayer.position.x -= 0.265;
				player.position.x -= 0.265;
			}
		}else if(keyCode == 68){
				if(countD < 2){
					outlinePlayer.position.x += 0.265;
					player.position.x += 0.265;
					countD = countD + 1;
					countA = countA - 1;
				}
		}
	}
	
	//declaram variabilele pentru modificari in slidere
	var listengap = document.querySelector("#RateOfGeneration");
	var numOfObstacles = document.querySelector("#NumberOfObstacles");
	
	//variabile pentru butoane
	var start = document.querySelector("#Start");
	var startFlag = false;
	var reStartWhenLose = document.querySelector("#RestartWhenLose");
	var reStartFlagWhenLose = false;
	var reStartWhenWin = document.querySelector("#RestartWhenWin");
	var reStartFlagWhenWin = false;
	var wasRestarted = false;

	//preluam valorile default
	var thresholdGap = listengap.value;
	var numberToBeGenerated = numOfObstacles.value;

	//variabile pentru generarea obstacolelor
	var gap = 0;
	var obstacle;
	var index = 0;
	var matrixOfObstacles = [];

	//cream healthBar
	var healthBar = createHealthBar();
	var retainScale = healthBar.scale.x;
	setHealthbarPosition(healthBar);
	scene.add(healthBar);


	//render-uim scena si camera
	var loop = function(){
	renderer.render(scene, camera);
	animateMatrix(matrixOfCuboids);
	animateMatrix(matrixOfLines);

	//verificam daca sau schimbat valorile 
	listengap.addEventListener('change', function(el){
		thresholdGap = el.currentTarget.value;
	})

	numOfObstacles.addEventListener('change', function(el){
		numberToBeGenerated = el.currentTarget.value;
	})


	//daca am apasat pe butonul de start seteaza flagul true
	start.onclick = function() {
		startPageFlag = true;
	}

	//verificam daca nu am pierdut sau castigat deja
	if(reStartFlagWhenLose == false) reStartWhenLose.addEventListener('click', RestartGameWhenLose, false);
	if(reStartFlagWhenWin == false) reStartWhenWin.addEventListener('click', RestartGameWhenWin, false);

	//daca am apasat start porneste jocul
	if(startPageFlag == true ){
		StartGame();
	}


	function StartGame(event){

	//ascunde pagina de start
	document.getElementById('PaginaDeStart').style.display = "none";

	//reinitializam matricea de obstacole 
	if(startFlag == false){
		resetMatrix(matrixOfObstacles, index, scene);
	}

	//setam flagurile 
	reStartFlagWhenLose = false;
	reStartFlagWhenWin = false;
	startFlag = true;

	//daca modificam numarul de obiecte si numarul curent este mai 
	//mare decat valoarea pe care o dorim sa o generam reinitializam matricea de obstacole
	if((index > numberToBeGenerated)){
		resetMatrix(matrixOfObstacles, index, scene);
	}

	//creaza si animeaza Obstacolele
	gap++;
	if(gap == thresholdGap && index < numberToBeGenerated){
		obstacle = generateObstacle();
		var generatedX = generateRandomInteger(0, 4);
		obstacle.position.x = generatedX - generatedX/1.38;
		scene.add(matrixOfObstacles[index++] = obstacle);
		gap = 0;
	}else if(gap > thresholdGap){
		gap = 0;
	}

	//punem animatie, facem update la pozitie si la obiectele din scene
	updateMatrixOfObstacles(matrixOfObstacles, index, scene);
	}

	//verificam coliziunea dintre platforme si player
	var collisionWithPlatforms = collisionDetection(player, matrixOfCuboids);
	updatePlayerPosition(collisionWithPlatforms, player, outlinePlayer);

	//verificam coliziunea dinte obstacole si player
	var collisionWithObstacles = collisionDetection(player, matrixOfObstacles);
	//daca am avut o coliziune scalam healtbar-ul 
	if(collisionWithObstacles && healthBar.scale.x > 0){
		healthBar.scale.x -= 0.05;	
	}else if(healthBar.scale.x <= 0){ //daca valoarea dupa scalare este mai mica sau egala cu 0 
		//stergem player-ul din scena si healthbar-ul
		removePlayerFromScene(player, outlinePlayer, healthBar, scene);

		//facem vizibila pagina care apare cand pierzi
		document.getElementById('PaginaLose').style.display = "initial";
	}

	//verificam daca toate obstacolele au trecut si player-ul este inca in viata. Daca este facem vizibila pagina atunci cand castiga
	if((index == numberToBeGenerated) && (obstacle.position.z > 2.5599999999999894) && (healthBar.scale.x > 0)) document.getElementById('PaginaWin').style.display = "initial";

	function RestartGameWhenLose(event){
		reStartFlagWhenLose = true;
		reStartFlagWhenLose1 = true;
		wasRestarted = true;

		//reinitialize player position
		resetPlayerPosition(player, outlinePlayer, scene);

		//reset matrix of Obstacles
		for(var i = 0 ; i<index; i++)
			scene.remove(matrixOfObstacles[i]);

		scene.remove(matrixOfObstacles);
		matrixOfObstacles = [];
		index = 0;

		//resetam healthbar
		healthBar.scale.x = retainScale;
		scene.add(healthBar);

		//ascunde pagina si apelam functia StarGame
		document.getElementById('PaginaLose').style.display = "none";
		StartGame();
	}

	function RestartGameWhenWin(event){
		reStartFlagWhenLose = true;
		reStartFlagWhenLose1 = true;
		wasRestarted = true;

		//reinitialize player position
		resetPlayerPosition(player, outlinePlayer, scene);

		//reset matrix of Obstacles
		for(var i = 0 ; i<index; i++)
			scene.remove(matrixOfObstacles[i]);

		scene.remove(matrixOfObstacles);
		matrixOfObstacles = [];
		index = 0;

		//resetam healthbar
		healthBar.scale.x = retainScale;
		scene.add(healthBar);

		//ascunde pagina si apelam functia StarGame
		document.getElementById('PaginaWin').style.display = "none";
		StartGame();
	}

	//rotim healthBar
	healthBar.rotation.x += 0.005;
	requestAnimationFrame(loop);
	};


	requestAnimationFrame(loop);
}

function resizeWindow(canvas){
	gl = canvas.getContext('webgl');
	var dpi = window.devicePixelRatio;

	//preia marimea din stylesheet 	
 	var style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
 	var style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

 	//seteaza marimea canvas-ului la valorile preluate
 	canvas.setAttribute('height', style_height * dpi);
	canvas.setAttribute('width', style_width * dpi);

	if(!gl){
		console.log('WebGL not supported, you are redirected to experimental-WebGL');
		gl = canvas.getContext('experimental-WebGL');
	}

	if(!gl){
		alert('Your browser does not support WebGL');
	}

	//schimbam dimensiunea canvas-ului pentru a obtine 
	//imagini clare
 	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 	gl.enable(gl.DEPTH_TEST);
 	gl.enable(gl.CULL_FACE);
 	gl.cullFace(gl.BACK);
 	gl.frontFace(gl.CCW);

}

function resetCounters(countA, countD){
	countA = 0;
	countD = 0;
}

function collisionDetection(object, listOfCollidableObjects){
	var originPoint = object.position.clone();
	var hit = false;
    for (var i = 0; i < object.geometry.vertices.length; i++) {   
         var localVertex = object.geometry.vertices[i].clone();
   		 var globalVertex = localVertex.applyMatrix4(object.matrix);
    	 var directionVector = globalVertex.sub( object.position );

         var ray = new THREE.Raycaster( object.position, directionVector.clone().normalize() );
         var collisionResults = ray.intersectObjects( listOfCollidableObjects );
    	if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
       		hit = true;

    	}	
    }

    return hit; 
}


main();
