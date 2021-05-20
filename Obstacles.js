function generateObstacle(){
	const obstacleGeometry = new THREE.BoxGeometry(0.25,0.0625,0.25/4);
	const obstacleColor = new THREE.MeshLambertMaterial({ color: 0xEB9486});

	obstacle = new THREE.Mesh(obstacleGeometry, obstacleColor);
	obstacle.position.z = 0;
	obstacle.position.x = 0.55;

	return obstacle;
}

function generateRandomInteger(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateMatrixOfObstacles(matrixOfObstacles, index, scene){
	animateMatrixOfObstacles(matrixOfObstacles, index);
	updateZPosition(matrixOfObstacles, index);
	deleteObstacleAtPositionX(matrixOfObstacles, index, scene);
}

function animateMatrixOfObstacles(matrixOfObstacles, index){
	for(let i = 0 ; i<index ; i++){
		if(matrixOfObstacles[i] != null)
			matrixOfObstacles[i].position.y = (Math.sin(new Date().getTime()/350  + matrixOfObstacles[i].position.x/0.02) + 7.57)/80; 
	}
}

function updateZPosition(matrixOfObstacles, index){
	var increase = 1.01;
	for(let i = 0 ; i<index ; i++) if(matrixOfObstacles[i] != null) {
		if(index >= 100 && index < 200) increase = 1.4;
		else if(index >= 200 && index<300) increase = 1.6;
		else if(index >= 300 && index< 400) increase = 1.8;
		else if(index >= 400 && index< 500) increase = 2.2;
		else if(index >= 500 && index< 600) increase = 2.6;
		else if(index >= 600 && index< 700) increase = 2.8;
		else if(index >= 700 && index<= 800) increase = 3.2;

		matrixOfObstacles[i].position.z += 0.01 * increase;
	}
}

function deleteObstacleAtPositionX(matrixOfObstacles, index, scene){
for(let i = 0 ; i<index ; i++){
	if((matrixOfObstacles[i] != null) && (matrixOfObstacles[i].position.z > 2.5599999999999894)){
	 		scene.remove(matrixOfObstacles[i]);
		}
	}
}

function resetMatrix(matrixOfObstacles, index, scene){
	for(var i = 0 ; i<index; i++)
		scene.remove(matrixOfObstacles[i]);

		scene.remove(matrixOfObstacles);
		matrixOfObstacles = [];
		index = 0;
}