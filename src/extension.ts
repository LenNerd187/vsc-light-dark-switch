// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vsc from 'vscode';

export function activate(context: vsc.ExtensionContext) {

	console.log('Extension "vsc-light-dark-switch" is now active!');

	let disposable2 = vsc.commands.registerCommand('vsc-light-dark-switch.toggle', () => {
        const config = vsc.workspace.getConfiguration('workbench');
        const currentTheme = config.get('colorTheme');
        if (currentTheme === config.get('preferredLightColorTheme')){
            setTheme(ThemeType.Dark);
        }else{
            setTheme(ThemeType.Light);
        }
	});

	let disposable3 = vsc.commands.registerCommand('vsc-light-dark-switch.activateLightMode', () => {
        setTheme(ThemeType.Light);
	});
    
	let disposable4 = vsc.commands.registerCommand('vsc-light-dark-switch.activateDarkMode', () => {
        setTheme(ThemeType.Dark);
	});

	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);

    // 
    // Start timer to check every minute if it is time to switch dark/light mode
    checkForSwitchOnTime();

}


function checkForSwitchOnTime(){
    // get current time
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    console.log("systemTime = " + hours + ":" + minutes);
    // get times from config
    const config = vsc.workspace.getConfiguration('vsc-light-dark-switch');
    const darkTime = config.get('darkThemeTime') as string;
    const lightTime = config.get('lightThemeTime') as string;
    const darkHours = darkTime.split(':')[0];
    const darkMinutes = darkTime.split(':')[1];
    const lightHours = lightTime.split(':')[0];
    const lightMinutes = lightTime.split(':')[1];
    console.log("darkTime = " + darkHours + ":" + darkMinutes);
    console.log("lightTime = " + lightHours + ":" + lightMinutes);
    
    // compare to config times
    setTimeout(checkForSwitchOnTime, 60 * 1000);
}

enum ThemeType {
    Light,
    Dark
}
function setTheme(type: ThemeType){
    const workbenchConfig = vsc.workspace.getConfiguration('workbench');
    const theme = workbenchConfig.get(type === ThemeType.Light ? 'preferredLightColorTheme' : 'preferredDarkColorTheme');
    workbenchConfig.update('colorTheme', theme, vsc.ConfigurationTarget.Global);
}

// This method is called when your extension is deactivated
export function deactivate() {}
