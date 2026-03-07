import edjsHTML from 'editorjs-html/.build/edjsHTML.node';
import sanitizeHtml from 'sanitize-html';

type EditorJsImageBlock = {
  type?: 'image';
  data: {
    file: { url: string };
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
  };
};

type EditorJsBlock = EditorJsImageBlock & {
  data: Record<string, unknown>;
};

const edjsParser = edjsHTML({
  image: (block: EditorJsBlock) => {
    const { file, caption, withBorder, withBackground, stretched } =
      block.data as EditorJsImageBlock['data'];

    const classes = [
      'edjs-image',
      withBorder && 'edjs-image--border',
      withBackground && 'edjs-image--background',
      stretched && 'edjs-image--stretched',
    ]
      .filter(Boolean)
      .join(' ');

    return `
      <figure class="${classes}">
        <img src="${file.url}" alt="${caption || ''}" />
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
  },
});

function parseEdjsToHtml(blockContent: string) {
  const html = edjsParser.parse(JSON.parse(blockContent));
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'b',
      'i',
      'em',
      'strong',
      'a',
      'ul',
      'ol',
      'li',
      'figure',
      'img',
      'figcaption',
      'blockquote',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'br',
      'span',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
      figure: ['class'],
      figcaption: ['class'],
      span: ['class'],
    },
    allowedSchemes: ['http', 'https', 'data'],
    transformTags: {
      a: (tagName: string, attribs: Record<string, string>) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    },
  });
}

export default parseEdjsToHtml;
