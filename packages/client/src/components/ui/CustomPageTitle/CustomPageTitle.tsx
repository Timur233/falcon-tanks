import './CustomPageTitle.scss'
import React from 'react'

type PageTitlePropsType = {
  text: string
  className?: string
  tagName?: string
}

type DynamicTagElementPropsType = {
  tagName: string
  children: React.ReactNode
}

export const CustomPageTitle = (props: PageTitlePropsType) => {
  const { text, className = '', tagName = 'h2' } = props
  const DynamicTagElement = ({
    tagName,
    children,
  }: DynamicTagElementPropsType) => React.createElement(tagName, null, children)

  return (
    <div className={`custom-page-title ${className}`}>
      <div className="custom-page-title__block">
        <div className="custom-page-title__border"></div>
        <div className="custom-page-title__screws"></div>

        <div className="custom-page-title__content">
          <DynamicTagElement tagName={tagName}>{text}</DynamicTagElement>
        </div>
      </div>
    </div>
  )
}
