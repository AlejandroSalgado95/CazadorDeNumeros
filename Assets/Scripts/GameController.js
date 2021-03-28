#pragma strict
import UnityEngine.UI;

public var EnemyCount : int;
public var Enemy : GameObject;
public var SpawnPosition : Transform[];
public var spawnWait : float;
public var waveWait :float;
public var playerHealth : UI.Slider;
public var HealthText : UI.Text;
public var ScoreText : UI.Text;
private var pointsCounter : int;
public var PauseImage : GameObject;
public var PauseButton : GameObject;
public var Panel : GameObject;
public var WeaponPos : Transform[];
public var WeaponObject : GameObject[];
public var WeaponsImage : Sprite[];
public var Wimage1 : UI.Image;
private var ActualWeapon : GameObject;
private var Player: GameObject;
public var NumberWeapon : int;

public var Numerators: int[];
public var Results: int[];
public var Equation: UI.Text;
private var RandomInt: int;
private var operator: String;

function Start () 
{
	RandomInt = Random.Range(1,40);
	if ((RandomInt >= 0) && (RandomInt <=9))
		operator = " + ";
	else if ((RandomInt >= 10) && (RandomInt <=19))
		operator = " - ";
	else if ((RandomInt >= 20) && (RandomInt <=29))
		operator = " x ";
	else if ((RandomInt >= 30) && (RandomInt <=39))
		operator = " / ";
		
	Equation.text = "Resuelve: " + Numerators[RandomInt].ToString() + operator + "? = " + Results[RandomInt].ToString();
	yield SpawnWaves();
	HealthText.text = "100%";
	ScoreText.text = "0";
	pointsCounter = 0;
	PauseImage.SetActive(false);
	Panel.SetActive(false);	
	NumberWeapon = 0;
}

function Update()
{
	if (playerHealth.value <= 0)
	{
		YouLost();
	}
}

function  SpawnWaves()
{
		while (true) 
		{
			var Cont : int;
			for (Cont = 0; Cont < EnemyCount; Cont++) 
			{
				
				//spawnValues = new Vector3 (Random.Range (-spawnValues.x, spawnValues.x), spawnValues.y, spawnValues.z);
				//Vector3 spawnPosition = new Vector3 (Random.Range(-6.0f, 6.0f), 0.0f, 16.0f);
				var spawnRotation : Quaternion = Quaternion.identity; 
				Instantiate (Enemy, SpawnPosition[Random.Range(0,4)].position, spawnRotation);
				//Instantiate (hazard, spawnPosition, quaternion.identity);
				//Instantiate (hazard, spawnValues, quaternion.identity);
				yield WaitForSeconds (spawnWait); //To make this function pause without pausing the entire game, you need to make this function a coroutine, and coroutines have some very specific considerations: 
				//1) you can not return void, you must return IEnumerator
				//2) WaitForSeconds must be written: yield return new WaitForSeconds
				//3) you can not call a coroutine like you call a function. The call of a coroutine must be written: StartCoroutine (coroutine's signature)
			}
			yield  WaitForSeconds (waveWait);

			/*
			if (gameOver)
			{
				restartText.text = "Press 'R' for restart";
				restart = true;
				break;
			}
			*/
		 }
}

public function DamagePlayer( damage : int)
{
	//playerHealth.value -= damage;
	var newHealth: int = playerHealth.value - damage; 
	yield LerpDamage(newHealth);
}

function LerpDamage(newHealth : int)
{
	while (playerHealth.value > newHealth)
	{
		playerHealth.value -= 1f;
		HealthText.text = playerHealth.value.ToString() + "%";
		yield;
	}
	/*
	if (playerHealth.value == 0)
	{
		YouLost();
	}
	*/
}

public function Scored( points : int)
{
	yield LerpScore(points);	
}

function LerpScore( points : int)
{	
	var TempScore : int = pointsCounter;
	pointsCounter += points;
	while( TempScore < pointsCounter)
	{
		TempScore += 1;
		ScoreText.text = "Puntos: " + TempScore.ToString();
		yield;
	}
	if (TempScore >= 100)
		YouWon();
}

function YouWon()
{
	Application.LoadLevel(3);
}

function YouLost()
{
	Application.LoadLevel(2);
}

public function Pause()
{
	Time.timeScale = 0;
	Panel.SetActive(true);
	//PauseButton.SetActive(false);
	PauseImage.SetActive(true);
	
}

public function Unpause()
{
	Time.timeScale = 1;
	Panel.SetActive(false);
	//PauseButton.SetActive(true);
	PauseImage.SetActive(false);
}

public function BackToMenu()
{
	Time.timeScale = 1;
	Application.LoadLevel(0);
}

public function ChangeWeapon1()
{
	NumberWeapon += 1;
	if (NumberWeapon >= 5)
		NumberWeapon = 0;
		
	Player = GameObject.FindWithTag("Player");
	Wimage1.sprite = WeaponsImage[NumberWeapon];
	ActualWeapon = GameObject.FindWithTag("ActualWeapon");
	Destroy(ActualWeapon);
	var ActualWeapon = Instantiate(WeaponObject[NumberWeapon],WeaponPos[0].position,Quaternion.identity);
	ActualWeapon.transform.rotation = Player.transform.rotation;
	ActualWeapon.transform.parent = Player.transform; 

}

public function ChangeWeapon2()
{
	
}

public function ValidateOperation(number : int, type: int)
{
	var points : int = 10;
	var damage : int = 20;
	
	if (type == 1)
	{
		if (Numerators[RandomInt]+number == Results[RandomInt])
		{
			Scored(points);
			RandomInt = Random.Range(0,40);
		}
		else
		DamagePlayer(damage);
	}
	else if (type == 2)
	{
		if (Numerators[RandomInt]-number == Results[RandomInt])
		{
			Scored(points);
			RandomInt = Random.Range(0,40);
		}
		else
		DamagePlayer(damage);
	}
	else if (type == 3)
	{
		if (Numerators[RandomInt]*number == Results[RandomInt])
		{
			Scored(points);
			RandomInt = Random.Range(0,40);
		}
		else
		DamagePlayer(damage);
	}
	else if (type == 4)
	{
		if (Numerators[RandomInt]/number == Results[RandomInt])
		{
			Scored(points);
			RandomInt = Random.Range(0,40);
		}
		else
		DamagePlayer(damage);
	}
	
	if ((RandomInt >= 0) && (RandomInt <=9))
		operator = " + ";
	else if ((RandomInt >= 10) && (RandomInt <=19))
		operator = " - ";
	else if ((RandomInt >= 20) && (RandomInt <=29))
		operator = " x ";
	else if ((RandomInt >= 30) && (RandomInt <=39))
		operator = " / ";
		
	Equation.text = "Resuelve: " + Numerators[RandomInt].ToString() + operator + "? = " + Results[RandomInt].ToString();
	
}

