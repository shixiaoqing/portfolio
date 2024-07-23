import {Component} from "react";

class KeyPG extends Component{
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h3>Developer Notes</h3>
                <p>KeyPG is in early stages of development and set to be released for Alpha testing in August.
                    My vision for KeyPG is a game/application where people can learn how to type faster in their chosen language in
                    a fun and interactive way. Currently, I have built out the keyboard system that allows me to swap between
                    different languages, as well as letting me implement features such as a currently existing timed hint feature.
                    The timed hint feature allows users to set a time in which if they don't click the key, it will provide users
                    with a visual queue by showing them where the key is, users can also disable this feature all together.
                     Although seemingly simple, some languages like Korean
                    have certain characters that are different from the main set of characters that will change over to the
                    secondary set of keys once users press the Caps Lock key.
                </p>
                <h3>Development Map</h3>
                <ul>
                    <h4>Medium/Hard Levels</h4>
                    <p>Currently, the app only supports a simple character mode. Our app generates a random set of characters
                    and the player must tap the correct key. However, I want to expand upon this by adding a mode which allows
                    people to learn to type full sentences. In standard Korean IMEs as users input characters, the IME will
                    form the word. Since I'm not using an IME, I need to decide how I want characters to form while still maintaining
                    our guide view. Also, users should be able to type just syllables without it joining up to form a character.
                    To accomplish this, I will need to implement a composable that will allow us to see if the characters the
                    user pressed is correct and reflect it in the view. I will also need a view to display the current character
                    the user is typing. It will need to update the view, but be able to handle syllables without combining them
                    if our application is not asking for full words.</p>
                    <h4>Test</h4>
                </ul>
            </div>
        )
    }
}

export default KeyPG;