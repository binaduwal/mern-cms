import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactQuill, { Quill } from 'react-quill';
import { TiDeleteOutline } from 'react-icons/ti';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import './style.css';


const InlineEmbed = Quill.import('blots/embed');
class ImageBlot extends InlineEmbed {
  static blotName = 'imageBlot';
  static tagName = 'div';
  static className = 'image-container';

  static create(value) {
    const node = super.create();
    node.setAttribute('data-src', value);

    const img = document.createElement('img');
    img.setAttribute('src', value);
    node.appendChild(img);

    const btn = document.createElement('div');
    btn.classList.add('delete-icon');
    ReactDOM.render(<TiDeleteOutline />, btn);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const blot = Quill.find(node);
      blot.remove();
    });

    node.appendChild(btn);
    return node;
  }

  static value(node) {
    return node.getAttribute('data-src');
  }
}

Quill.register(ImageBlot, true);
Quill.register('modules/imageResize', ImageResize);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      theme: 'snow'
    };
    this.handleChange = this.handleChange.bind(this);
    this.quillRef = null;
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <ReactQuill
        ref={(el) => { this.quillRef = el; }}
        theme={this.state.theme}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds={'#root'}
        placeholder={this.props.placeholder}
      />
    );
  }
}

Editor.modules = {
  toolbar: {
    container: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const range = this.quill.getSelection(true);
            this.quill.insertEmbed(range.index, 'imageBlot', e.target.result);
            this.quill.setSelection(range.index + 1);
          };
          reader.readAsDataURL(file);
        };
      }
    }
  },
  clipboard: { matchVisual: false },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
};

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'align',
  'link', 'video',
  'imageBlot'
];

export default Editor;

