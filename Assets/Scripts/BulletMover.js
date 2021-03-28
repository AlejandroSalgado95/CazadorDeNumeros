#pragma strict

private var rb : Rigidbody;
public var speed: float;
public var spawnPointOrigin : Transform;
public var spawnPointDirection : Transform;
private var direction : Vector3;
private var rightDirection : Quaternion;

function Start () 
{
	rb = GetComponent.<Rigidbody>();
	spawnPointOrigin = GameObject.FindWithTag("SPO").GetComponent.<Transform>();
	spawnPointDirection = GameObject.FindWithTag("SPD").GetComponent.<Transform>();
	direction = spawnPointDirection.position - spawnPointOrigin.position;
	
	if (gameObject.CompareTag("SumBullet") || gameObject.CompareTag("SubstractionBullet"))
	{
		rightDirection = Quaternion.LookRotation(direction);
		transform.rotation = rightDirection;
	}

	rb.velocity = direction.normalized * speed;
}
