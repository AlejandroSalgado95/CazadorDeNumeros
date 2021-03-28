#pragma strict
public var playerPos : Transform;
private var offset : Vector3;
private var newCameraPos : Vector3;
public var smoothing : float;

function Start () 
{
	offset = transform.position - playerPos.position;
}

function Update () 
{
	newCameraPos = playerPos.position + offset;
	transform.position = Vector3.Lerp(transform.position, newCameraPos, smoothing * Time.deltaTime); //La camara avanza smoothing unidades por segundo hacia la coordenada newCameraPos
}