import * as vscode from 'vscode'
import VuexLinkMover from './action'

export default class VuexLinkMoveController {
  private _vuexLinkMover: VuexLinkMover
  private _disposable: vscode.Disposable

  constructor(vuexLinkMover: VuexLinkMover) {
    this._vuexLinkMover = vuexLinkMover
    let subscriptions: vscode.Disposable[] = []
    // cursor 위치 이동시(클릭 시) _onEvent() 작동
    vscode.window.onDidChangeTextEditorSelection(
      this._onEvent,
      this,
      subscriptions
    )
    // 활성화 된 텍스트 에디터 변경시 _onEvent() 작동
    vscode.window.onDidChangeActiveTextEditor(
      this._onEvent,
      this,
      subscriptions
    )

    // 실행시
    this._vuexLinkMover.startTrackingVuex()

    //Disposable 개체들을 묶어 배열로 만들어둔다.
    this._disposable = vscode.Disposable.from(...subscriptions)
  }

  dispose() {
    this._disposable.dispose()
  }

  private _onEvent() {
    this._vuexLinkMover.startTrackingVuex()
  }
}
