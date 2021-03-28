#pragma strict

function BackToMenu (Level:int)
{
	Application.LoadLevel(Level);
}

function QuitGame ()
{
	Application.Quit();
}