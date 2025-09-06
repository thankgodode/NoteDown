'use dom';

export default function DOMComponent({ content}) {
  return (
    <div dangerouslySetInnerHTML={{__html:content}}/>
  );
}

