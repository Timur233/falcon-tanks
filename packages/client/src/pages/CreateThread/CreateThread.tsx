import { Button } from '@/components/ui/Button/Button'
import { File } from '@/components/ui/File/File'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import './CreateThread.scss'

export const CreateThread = () => {
  return (
    <div className="create-thread-page container">
      <form action="#" className="create-thread-page__form form">
        <PageTitle tagName="h1" text="Создать тему"></PageTitle>
        <input type="text" name="thread-title" />
        <textarea name="first-comment" id="first-comment"></textarea>
        <File></File>
        <Button text="Отправить" useFixWidth className="form__submit"></Button>
      </form>
    </div>
  )
}
