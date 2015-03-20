#pragma strict
var player : GameObject;
var gameController : GameObject;
var speed : float;
var direction : String;
var score: int;

//initialize stuff
function Start () {
	score = 0;
}

function Update () {

	//move player around
	if (Input.GetKeyDown(KeyCode.LeftArrow)) direction = "left";
	else if (Input.GetKeyDown(KeyCode.RightArrow)) direction = "right";
	else if (Input.GetKeyDown(KeyCode.UpArrow)) direction = "forward";
	else if (Input.GetKeyDown(KeyCode.DownArrow)) direction = "backward";
	else if (Input.GetKeyDown(KeyCode.S)) direction = "down";
	else if (Input.GetKeyDown(KeyCode.W)) direction = "up";
	switch(direction) {
		case "left":
			transform.position.z -= speed * Time.deltaTime;
			break;
		case "right":
			transform.position.z += speed * Time.deltaTime;
			break;
		case "forward":
			transform.position.x -= speed * Time.deltaTime;
			break;
		case "backward":
			transform.position.x += speed * Time.deltaTime;
			break;
		case "down":
			transform.position.y -= speed * Time.deltaTime;
			break;
		case "up":
			transform.position.y += speed * Time.deltaTime;
			break;
	}
	
	
	//restart game; quit application
	if (Input.GetKeyDown(KeyCode.Space)) Application.LoadLevel("MainScene");
	else if (Input.GetKeyDown(KeyCode.Q) || Input.GetKeyDown("escape")) Application.Quit();
}


//2 cases: die against wall or absorb enemy
function OnTriggerEnter (other: Collider) {
	
	//handles dying against wall
	if (other.tag == "Wall") {
		speed = 0;
		
		//save score
		if (score > PlayerPrefs.GetInt("HighScore"))
			PlayerPrefs.SetInt("HighScore", score);
	}
	
	//handles absorbing enemy
	if (other.tag == "Foe") {
		other.transform.parent = player.transform; //add enemy to player
		gameController.SendMessage("HandleNewEnemy"); //make new enemy
		speed += 0.1; 
		score++;
	}
}


function OnGUI() {
	//display high score
 	GUI.Box(Rect(Screen.width - 150, 0 ,100, 20), "High Score:" + PlayerPrefs.GetInt("HighScore"));
 	GUI.Box(Rect(Screen.width - 150, 40 ,100, 20), "Current Score:" + score);
 }