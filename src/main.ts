import 'virtual:uno.css'
import './assets/scss/main.scss'
import '@unocss/reset/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import Button from 'primevue/button'
import router from './router'
import ColorPicker from 'primevue/colorpicker'
import { i18n } from '@/lib/i18n'
import CountryFlag from 'vue-country-flag-next'

import Loader from '@/components/global/Loader.vue'
import PageTitle from '@/components/global/PageTitle.vue'
import Avatar from '@/components/global/Avatar.vue'
import Link from '@/components/global/Link.vue'
import Pill from '@/components/global/Pill.vue'
import Page from '@/components/global/Page.vue'
import PageContent from '@/components/global/PageContent.vue'
import Divider from '@/components/global/Divider.vue'
import InputText from 'primevue/inputtext'
import { Form } from '@primevue/forms'
import Message from 'primevue/message'
import Card from 'primevue/card'
import Input from '@/components/global/Input.vue'
import FloatLabel from 'primevue/floatlabel'

const app = createApp(App)
app
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
  .component('Button', Button)
  .component('ColorPicker', ColorPicker)
  .component('Loader', Loader)
  .component('PageTitle', PageTitle)
  .component('Link', Link)
  .component('Pill', Pill)
  .component('Page', Page)
  .component('CountryFlag', CountryFlag)
  .component('PageContent', PageContent)
  .component('Avatar', Avatar)
  .component('Divider', Divider)
  .component('InputText', InputText)
  .component('Form', Form)
  .component('Message', Message)
  .component('Card', Card)
  .component('Input', Input)
  .component('FloatLabel', FloatLabel)
  .use(i18n)
  .use(router)

app.mount('#app')
