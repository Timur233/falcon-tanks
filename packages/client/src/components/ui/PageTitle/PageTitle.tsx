import React from 'react'
import './PageTitle.scss'

type PageTitlePropsType = {
  text: string
  className?: string
  tagName: string
}

type DynamicTagElementPropsType = {
  tagName: string
  children: React.ReactNode
}

export const PageTitle = (props: PageTitlePropsType) => {
  const { text, className = '', tagName = 'h2' } = props
  const DynamicTagElement = ({
    tagName,
    children,
  }: DynamicTagElementPropsType) => React.createElement(tagName, null, children)

  return (
    <div className={`page-title ${className}`}>
      <div className="page-title__block">
        <div className="page-title__content">
          <DynamicTagElement tagName={tagName}>{text}</DynamicTagElement>
        </div>
      </div>
    </div>
  )
}
