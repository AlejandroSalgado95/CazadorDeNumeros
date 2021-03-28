#pragma strict
import UnityEngine.EventSystems;

class ButtonSound extends MonoBehaviour implements /*IPointerDownHandler,*/ IPointerEnterHandler, IPointerUpHandler
{

	public var aClip : AudioClip[];
	private var aSource : AudioSource;
	private var touched : boolean;
	private var ID : int;
	
	function Start()
	{
		aSource = GetComponent.<AudioSource>();
		touched = false;
	}

	public function OnPointerEnter(data: PointerEventData)
	{
		if (gameObject.CompareTag("Back"))
		{
			aSource.clip = aClip[0];
			aSource.Play();	
		}
		else
		{
			aSource.clip = aClip[1];
			aSource.Play();	
		}
	}

	/*
	public function OnPointerDown(data: PointerEventData)
	{
		aSource.clip = aClip[2];
		aSource.Play();
	}*/
	
	
	public function OnPointerUp(data: PointerEventData)
	{
		aSource.clip = aClip[2];
		aSource.Play();
	}
	
	
}