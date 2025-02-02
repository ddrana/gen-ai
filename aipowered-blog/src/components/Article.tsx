import React from 'react'

type Props = {}

const Article = (props: Props) => {
    const [articleTitle, setArticleTitle] = React.useState<string>("");
    const [articleOutline, setArticleOutline] = React.useState<string>("");
    const [copilotText, setCopilotText] = React.useState<string>("");
    
  return (
    <div>Article</div>
  )
}

export default Article