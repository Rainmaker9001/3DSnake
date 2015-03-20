#pragma strict

var enemy : GameObject;

function Start () {
	
}

function Update () {
	
	
}

//when user hits enemy, put new enemy in random location
function HandleNewEnemy() {

	//put new enemy in random location within box and far from player
	while (true) {
		var x: int = Random.Range(1, 9);
		var y: int = Random.Range(1, 9);
		var z: int = Random.Range(1, 9);
		var enemyPos : Vector3 = Vector3(x, y, z);
		if (Vector3.Distance(enemyPos, transform.position) > 1) break;
	}
	Instantiate(enemy, enemyPos, Quaternion.identity);
}
