import * as vscode from 'vscode'

export default class VuexLinkMover {
  //왼쪽 상태바 생성
  private _statusBarItem: vscode.StatusBarItem =
    vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)

  public startTrackingVuex() {
    let editor = vscode.window.activeTextEditor
    // 현재 바라보고 있는 TextEditor가 없다면
    if (!editor) {
      //상태바 종료
      this._statusBarItem.hide()
      return
    }

    let document = editor.document

    //조건문
    if (document.languageId === 'vue') {
      let textData = this._getEditorCurorTextData()
      //상태바 내용 변경
      this._statusBarItem.text = `vuex 감시 중`
      //상태바 표시
      this._statusBarItem.show()
    }
  }

  //현재 에디터 데이터 가져오기.
  _getEditorCurorTextData(): string {
    let editor = vscode.window.activeTextEditor

    if (editor) {
      let document = editor.document

      let textData = this._getDocumentTextData(document)

      let selectedDataPosition = this._getSelectedPosition(editor)
      let selectedDataLine = this._getSelectedLine(editor)
      let selectedLineText = this._getSelectedLineTextData(
        textData,
        selectedDataLine
      )

      console.log(`${selectedDataLine + 1} 번째 줄에 마우스가 있습니다.`)
      console.log(`${selectedLineText}라는 내용이 해당 줄에 있습니다.`)

      //현재 선택자(커서)의 위치에 있는 문자의 범위를 가져옵니다.
      let selectedDataDetailPosition =
        document.getWordRangeAtPosition(selectedDataPosition)
      let selectedDetailText = document.getText(selectedDataDetailPosition)

      // 바깥 클릭 시 파일 전체의 내용이 나타남.
      if (selectedDetailText.length <= 25) {
        console.log(`구체적으로는 ${selectedDetailText} 에 대한 내용입니다.`)
      }

      return selectedLineText
    }

    return ''
  }
  /**
   * 파일 수준
   */

  //파일 내용 전체 불러오기
  _getDocumentTextData(document: vscode.TextDocument): string[] {
    return document.getText().split('\n')
  }
  //파일 경로 불러오기
  _getDocumentFilePath(document: vscode.TextDocument): string {
    return document.fileName
  }
  _getDocumentFileUri(document: vscode.TextDocument): vscode.Uri {
    return document.uri
  }

  /**
   * 내용 수준
   */
  //현재 선택 내용 위치 불러오기
  _getSelectedPosition(editor: vscode.TextEditor): vscode.Position {
    return editor.selection.active
  }
  //현재 선택 내용이 몇번째 줄인지 불러오기
  _getSelectedLine(editor: vscode.TextEditor): number {
    return editor.selection.active.line
  }
  //선택한 줄의 내용 불러오기
  _getSelectedLineTextData(
    documentData: string[],
    selectedDataLine: number
  ): string {
    return documentData[selectedDataLine]
  }

  // /**
  //  * 위치 컨트롤
  //  */
  // _setEditorCursorPosition(
  //   editor: vscode.TextEditor,
  //   anchor: vscode.Position,
  //   active: vscode.Position
  // ) {
  //   let position = new vscode.Position(0, 0)
  //   editor.revealRange(new vscode.Range(anchor, active))
  //   position.translate(15, 15)
  // }

  dispose() {
    this._statusBarItem.dispose()
  }
}
