import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

// 引入默认的样式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// 引入自己的样式
import './TextEditor.less'
// 引入PropTypes
import PropTypes from 'prop-types'
class TextEditor extends Component {
  static propTypes = {
    setEditor: PropTypes.func.isRequired
  }
  // 初始化的时候调用这个方法
  constructor(props) {
    super(props)
    this.props.setEditor(this)
  }
  // 限定传入过来的数据的类型及是否是必须的
  // 状态
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="text-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
export default TextEditor