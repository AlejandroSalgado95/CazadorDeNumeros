#pragma strict

public var Speed : float;
private var anim : Animator;
private var floorColliderMask: int;
public var RayLength : float;
public var shootLag : float;
private var Lag : float;
public var Bullet : GameObject[];
public var spawnPoint : GameObject;
private var aud : AudioSource;
public var GC: GameController;

private var BulletTemp : GameObject;

function Start () {
	anim = GetComponent.<Animator>();
	floorColliderMask = LayerMask.GetMask("Floor");
	Lag = 0.0f;
	aud = GetComponent.<AudioSource>();
}

function FixedUpdate ()
{
	var HMove : float;
	var VMove : float;
	var MovePerSecond : Vector3;
	var ScreenWorldRay : Ray;
	var HitPoint: RaycastHit;
	
	
	HMove = Input.GetAxis("Horizontal");
	VMove = Input.GetAxis("Vertical");
	
	MovePerSecond = new Vector3(HMove,0.0f,VMove) * Speed * Time.deltaTime; // Esto hace que se mueva Speed unidades por segundo
	transform.position += MovePerSecond;
	
	
	if (HMove != 0 || VMove != 0)
		anim.SetBool("IsMoving",true);
	else
		anim.SetBool("IsMoving",false);
	
	ScreenWorldRay = Camera.main.ScreenPointToRay(Input.mousePosition);
	if (Physics.Raycast(ScreenWorldRay, HitPoint, RayLength, floorColliderMask))
	{
		var LookDirection : Vector3;
		var RotationDirection: Quaternion;
		
		LookDirection = HitPoint.point - transform.position;
		LookDirection = new Vector3(LookDirection.x, 0.0f, LookDirection.z);
		
		RotationDirection = Quaternion.LookRotation (LookDirection);
		transform.rotation = RotationDirection;
	}
	
	if (Input.GetMouseButton(0) && (Time.time > Lag))
	{
		BulletTemp = Instantiate(Bullet[GC.NumberWeapon], spawnPoint.transform.position, Quaternion.EulerAngles(90,0,0));
		Lag = Time.time + shootLag;
	}
	
	
}

function OnCollisionEnter(col : Collision)
{
	if (col.collider.gameObject.CompareTag("Enemy"))
		aud.Play();
}