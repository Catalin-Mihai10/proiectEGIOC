function createMatrixOfCuboids(scene){
	//stabileste marimea,culoarea cuboidului si creaza linii de definire a marginilor
	const cuboidGeometry = new THREE.BoxGeometry(0.25,0.0625,0.25);
	const cuboidColor = new THREE.MeshLambertMaterial({ color: 0x2F4858});

	//creaza vectorul de cuboizii
	var cuboid;
	var arrayOfCuboids = [];

	//seteaza offsetul pentru distanta dintre obiecte
	var offsetX = 1.38;
	var offsetZ = 1.5;

	//creaza o matrice de 5 linii si 8 coloane 
	for(let i = 0; i<5; i++){
		for(let j = 0 ; j<8 ; j++){
		cuboid = new THREE.Mesh(cuboidGeometry, cuboidColor);
		arrayOfCuboids.push(cuboid);
		cuboid.position.x = i - i/offsetX;
		cuboid.position.z = j - j/offsetZ;
		scene.add(cuboid);
		}
	}

	return arrayOfCuboids;
}

function createMatrixOfLines(scene){
//stabileste marimea,culoarea cuboidului si creaza linii de definire a marginilor
	const cuboidGeometry = new THREE.BoxGeometry(0.25,0.0625,0.25);
	const edgeOfCuboid = new THREE.EdgesGeometry(cuboidGeometry);

	//creaza vectorul de linii
	var line
	var linesOfCuboids = [];

	//seteaza offsetul pentru distanta dintre obiecte
	var offsetX = 1.38;
	var offsetZ = 1.5;

	//creaza o matrice de 5 linii si 8 coloane 
	for(let i = 0; i<5; i++){
		for(let j = 0 ; j<8 ; j++){
		line = new THREE.LineSegments(edgeOfCuboid, new THREE.LineBasicMaterial({color: 0x3E5E6A, linewidth:4}));
		linesOfCuboids.push(line);
		line.position.x = i - i/offsetX;
		line.position.z = j - j/offsetZ;	
		scene.add(line);
		}
	}

	return linesOfCuboids;
}

function animateMatrix(matrix){
	matrix.forEach(function(el){
		el.position.y = (Math.sin(new Date().getTime()/350  + el.position.x/0.02) + 1)/80;
	});
}
