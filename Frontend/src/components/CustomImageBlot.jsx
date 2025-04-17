import Quill from 'quill';
const BlockEmbed = Quill.import('blots/block/embed');

class CustomImageBlot extends BlockEmbed {
  static create(src) {
    const node = super.create();
    node.setAttribute('contenteditable', false);

    const wrapper = document.createElement('div');
    wrapper.className = 'relative inline-block w-2/5';
    const img = document.createElement('img');
    img.src = src;
    img.style.width  = '40%';
    img.style.height = 'auto';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerText = '✖';
    btn.className = `
      absolute -top-2 -right-2 bg-red-500 text-white rounded-full
      w-6 h-6 flex items-center justify-center shadow-lg
    `;
    btn.style.display = 'none';

    wrapper.addEventListener('mouseenter', () => btn.style.display = 'flex');
    wrapper.addEventListener('mouseleave', () => btn.style.display = 'none');

    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const blot = Quill.find(node);
      blot?.remove();
    });

    wrapper.append(img, btn);
    node.appendChild(wrapper);
    return node;
  }

  static value(node) {
    return node.querySelector('img')?.src;
  }
}

CustomImageBlot.blotName = 'image';
CustomImageBlot.tagName = 'div';
Quill.register(CustomImageBlot);
