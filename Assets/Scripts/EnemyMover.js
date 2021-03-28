#pragma strict

var playerPos: Transform;
var vel: Vector3;
var speed: float;
//var hurtingPlayer: GameController;

function Start () {

	playerPos = GameObject.FindWithTag("Player").GetComponent.<Transform>();
	//hurtingPlayer = GameObject.FindWithTag("GameController").GetComponent(GameController);
}

function Update () {
	
	var direction: Vector3 = playerPos.position - transform.position;
	direction.y = 0.0f;
	var rotation: Quaternion = Quaternion.LookRotation(direction);
	transform.rotation = rotation;

	vel = direction.normalized;
	
	transform.position += (vel * speed * Time.deltaTime);
	 
}
/*
function OnCollisionEnter (col : Collision)
{
	if (col.collider.tag == "Player")
		hurtingPlayer.touched();
		
}
*/