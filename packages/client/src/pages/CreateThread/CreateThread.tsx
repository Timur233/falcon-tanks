import { Button } from '@/components/ui/Button/Button'
import { File } from '@/components/ui/File/File'
import { Input } from '@/components/ui/Input/Input'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import './CreateThread.scss'

export const CreateThread = () => {
  return (
    <div className="create-thread-page container">
      <form action="#" className="create-thread-page__form form">
        <PageTitle tagName="h1" text="Создать тему"></PageTitle>
        <Input
          name="thread-name"
          type="text"
          placeholder="Тема"
          className="thread-name"></Input>
        <textarea
          placeholder="Сообщение"
          className="form__textarea"
          name="first-comment"
          id="first-comment"></textarea>
        <File></File>
        <Button text="Отправить" useFixWidth className="form__submit"></Button>
      </form>
    </div>
  )
}
