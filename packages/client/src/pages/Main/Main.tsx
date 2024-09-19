import PromoImage from '@/assets/images/svg/FT-promo.svg';
import './Main.scss'

import { Button } from "@/components/ui/Button/Button";

export const Main = () => {
  return (
    <section className={'promo-page'}>
      <img className={'promo-page__logo'} src={PromoImage} alt={'promoImage'}/>
      <Button className={'promo-page__button'} text={'Войти'} useFixWidth={true} href={'/sign-in'} />
    </section>
  )
}
