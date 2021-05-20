function createPlayer(scene){

	var playerGeometry = new THREE.BoxGeometry(0.1,0.1,0.1);
	var playerColor = new THREE.MeshLambertMaterial({ color: 0xA53F2B});

	var player = new THREE.Mesh(playerGeometry, playerColor);
	player.position.x = 0.55;
	player.position.z = 2.35;
	player.position.y = matrixOfCuboids[37].position.y + 0.0999;
	scene.add(player);

	return player;
}

function createPlayerEdge(scene){
	var playerGeometry = new THREE.BoxGeometry(0.1,0.1,0.1);
	var edgeOfPlayer = new THREE.EdgesGeometry(playerGeometry);
	var lineOfPlayer = new THREE.LineSegments(edgeOfPlayer, new THREE.LineBasicMaterial({color:0xA53F2B, linewidth:1}));

	lineOfPlayer.position.x = 0.55;
	lineOfPlayer.position.z = 2.35;
	lineOfPlayer.position.y = matrixOfCuboids[37].position.y + 0.0999;
	scene.add(lineOfPlayer);

	return lineOfPlayer;
}

function updatePlayerPosition(collision, player, outlinePlayer){
	if(collision == true){
		player.translateY(0.00051);
		outlinePlayer.translateY(0.00051);
	}else{
		player.translateY(-0.0009);
		outlinePlayer.translateY(-0.0009);
	}
}

function createHealthBar(){
	const obstacleGeometry = new THREE.BoxGeometry(0.40,0.0625/1.5,0.25/4);
	const obstacleColor = new THREE.MeshLambertMaterial({ color: 0xCA1551});

	obstacle = new THREE.Mesh(obstacleGeometry, obstacleColor);
	obstacle.position.z = 0;
	obstacle.position.x = 0.55;

	return obstacle;
}

function resetPlayerPosition(player, outlinePlayer, scene){
	player.position.x = 0.55;
	player.position.z = 2.35;
	player.position.y = matrixOfCuboids[37].position.y + 0.0999;;
	outlinePlayer.position.x = 0.55;
	outlinePlayer.position.z = 2.35;
	outlinePlayer.position.y = matrixOfCuboids[37].position.y + 0.0999;
	scene.add(player);
	scene.add(outlinePlayer);
}

function setHealthbarPosition(healthBar){
	healthBar.position.x = -0.05;
	healthBar.position.y = 0.73;
	healthBar.position.z = 2.2;
}

function removePlayerFromScene(player, outlinePlayer, healthBar, scene){
	scene.remove(healthBar);
	scene.remove(player);
	scene.remove(outlinePlayer);
}