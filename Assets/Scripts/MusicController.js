#pragma strict

private static var instance: GameObject; //static so only one instance at a time
 
function Awake() {

	//destroy new instance that is not first instance
    if (instance != null && instance != this.gameObject) {
        Destroy(this.gameObject);
        return;
    } 
    else instance = this.gameObject;
    
    DontDestroyOnLoad(this.gameObject);
}