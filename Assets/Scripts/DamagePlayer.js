#pragma strict
import UnityEngine.UI;
public var Damage : int;
private var number: int;
public var gameController : GameController;
//public var EnemyHealth : int;
//public var DamageLag : float;
//private var Lag : float;
public var explosion : GameObject;
public var EnemyHealth : UI.Slider;
public var Score : int;
public var NumberText : UI.Text;
private var aud : AudioSource;

//private var newEnemyHealth: int;
//public var steam : GameObject;


function Start()
{
	number = Random.Range(1,10);
	NumberText.text = number.ToString();
	aud = GetComponent.<AudioSource>();
	gameController = GameObject.FindWithTag("GameController").GetComponent.<GameController>();
	//newEnemyHealth = EnemyHealth.maxValue;
	//Lag = 0.0f;
	//explosion = GameObject.FindWithTag("Explosion");
	//steam = GameObject.FindWithTag("Steam");
}



function OnCollisionEnter( col : Collision)
{
	if (col.collider.CompareTag("Player"))
	{
		gameController.DamagePlayer(Damage);
		//Lag = Time.time + DamageLag;
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
		//Instantiate(steam, gameObject.position, Quaternion.identity);
		Destroy(gameObject);
	
	}
}

/*
function Update()
{

	while (EnemyHealth.value > newEnemyHealth)
	{
		EnemyHealth.value -= 0.01;
	}
	
	if (EnemyHealth.value <= 0)
	{
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
		//Instantiate(steam, gameObject.position, Quaternion.identity);
		Destroy(gameObject);
	}
}
*/

function OnTriggerEnter(col:Collider)
{
	if (col.gameObject.tag != "GBoundary")
		Destroy(col.gameObject);

	if (col.CompareTag("Bullet"))
	{
		 //newEnemyHealth = EnemyHealth.value - 10;
		//yield LerpDamage(newEnemyHealth);
		EnemyHealth.value -= 10;
		aud.Play();
		
		if (EnemyHealth.value <= 0)
		{
			//gameController.Scored(Score);
			Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
			//Instantiate(steam, gameObject.position, Quaternion.identity);
			Destroy(gameObject);
			gameController.Scored(1);
		}
		
	}
	
	else if (col.CompareTag("SumBullet"))
	{
		gameController.ValidateOperation(number,1);
		Destroy(gameObject);
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);

	}
	
	else if (col.CompareTag("SubstractionBullet"))
	{
		gameController.ValidateOperation(number,2);
		Destroy(gameObject);
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
	}
	
	else if (col.CompareTag("MultiplicationBullet"))
	{
		gameController.ValidateOperation(number,3);
		Destroy(gameObject);
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
	}
	
	else if (col.CompareTag("DivisionBullet"))
	{
		gameController.ValidateOperation(number,4);
		Destroy(gameObject);
		Instantiate(explosion, gameObject.transform.position, Quaternion.identity);
	}
	
}
		
/*
function LerpDamage(newEnemyHealth : int)
{
	while (EnemyHealth.value > newEnemyHealth)
	{
		EnemyHealth.value -= 1;
		yield;
	}
}
*/