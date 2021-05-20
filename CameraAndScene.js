function createScene(){
	const scene = new THREE.Scene();
	const sceneColor = new THREE.Color("rgb(63, 48, 71)");
	scene.background = new THREE.Color(sceneColor);

	return scene;
}

function createCamera(width, height){
	const camera = new THREE.PerspectiveCamera(45, width / height , 0.1, 1000);
	camera.position.z = 3.4;
	camera.position.y = 0.3;
	camera.position.x = 0.551;

	return camera;
}

function addLightingToTheScene(scene){
	var ambientLight = new THREE.AmbientLight(0x404040 , 0.5);
	scene.add(ambientLight);

	var hemipshereLight = new THREE.HemisphereLight(0xEB9486, 0x4040FF, 1.0);
	scene.add(hemipshereLight);

	var directionalLight = new THREE.DirectionalLight(0x000000, 1.0);
	directionalLight.position.set(2, 10, 1);
	directionalLight.target.position.set(0.55, 2.35, 5);
	scene.add(directionalLight);
	scene.add(directionalLight.target);

	var spotLight = new THREE.SpotLight(0x7E7F9A, 1.0, 25.0, Math.PI / 4.0, 0.5, 1.0);
	spotLight.position.set(2, 10, 1);
	spotLight.target.position.set(0.55, 2.35, 5);
	scene.add(spotLight);
	scene.add(spotLight.target);
}