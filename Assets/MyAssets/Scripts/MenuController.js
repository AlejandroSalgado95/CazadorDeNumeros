#pragma strict

public var Button1: GameObject;
public var Button2: GameObject;
public var Button3: GameObject;
public var Button4: GameObject;
public var insChart: GameObject;
public var creditsChart: GameObject;


function Exit()
{
	Application.Quit();
}

function Play(Level : int)
{
	Application.LoadLevel(Level);
}

function Instructions()
{
	Button1.SetActive(false);
	Button2.SetActive(false);
	Button3.SetActive(false);
	Button4.SetActive(false);
	creditsChart.SetActive(false);
	insChart.SetActive(true);
}

function Credits()
{
	Button1.SetActive(false);
	Button2.SetActive(false);
	Button3.SetActive(false);
	Button4.SetActive(false);
	creditsChart.SetActive(true);
	insChart.SetActive(false);
}

function BackToMenu()
{
	Button1.SetActive(true);
	Button2.SetActive(true);
	Button3.SetActive(true);
	Button4.SetActive(true);
	insChart.SetActive(false);
	creditsChart.SetActive(false);
}