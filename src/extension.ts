// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import VuexLinkMover from './vuex-link/action'
import VuexLinkMoveController from './vuex-link/controller'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vuex-link" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let vuexLinkMover = new VuexLinkMover()
  let controller = new VuexLinkMoveController(vuexLinkMover)

  // Disposable 들을 지켜보고, 디엑티브 시 자동으로 처분한다.
  context.subscriptions.push(vuexLinkMover)
  context.subscriptions.push(controller)
}

// This method is called when your extension is deactivated
export function deactivate() {}
