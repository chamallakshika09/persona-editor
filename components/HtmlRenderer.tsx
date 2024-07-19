import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';

const elementClassMapping: { [key: string]: string } = {
  h1: 'text-2xl font-bold text-textPrimary',
  h2: 'text-xl font-bold text-textPrimary',
  p: 'text-sm text-textSecondary',
  ul: 'list-disc mb-4 ml-6',
  ol: 'list-decimal mb-4 ml-6',
  strong: 'font-bold',
  em: 'italic',
  u: 'underline',
  blockquote: 'mb-4 pl-4 border-l-4 border-gray-300',
};

interface HtmlRendererProps {
  htmlString: string;
}

export default function HtmlRenderer({ htmlString }: HtmlRendererProps) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if ((domNode as Element).type === 'tag' && elementClassMapping[(domNode as Element).name]) {
        const Tag = (domNode as Element).name as keyof JSX.IntrinsicElements;
        return (
          <Tag className={elementClassMapping[(domNode as Element).name]}>
            {domToReact((domNode as Element).children as DOMNode[], options)}
          </Tag>
        );
      }
    },
  };

  return parse(htmlString, options);
}
