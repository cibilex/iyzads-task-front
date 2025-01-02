import 'virtual:uno.css'
import './assets/scss/main.scss'
import '@unocss/reset/tailwind.css'
import 'primeicons/primeicons.css'

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
import Checkbox from 'primevue/checkbox'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Tag from 'primevue/tag'
import CommonDialog from '@/components/global/CommonDialog.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import CommonTable from '@/components/global/CommonTable.vue'
import Dialog from 'primevue/dialog'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ToggleSwitch from 'primevue/toggleswitch'
import TextareaTag from 'primevue/textarea'
import Textarea from '@/components/global/Textarea.vue'
import InputNumber from 'primevue/inputnumber'
import NumberInput from '@/components/global/NumberInput.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

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
  .use(ToastService)
  .use(ConfirmationService)
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
  .component('Checkbox', Checkbox)
  .component('Toast', Toast)
  .component('Tag', Tag)
  .component('CommonDialog', CommonDialog)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component('CommonTable', CommonTable)
  .component('Dialog', Dialog)
  .component('Tabs', Tabs)
  .component('TabList', TabList)
  .component('Tab', Tab)
  .component('TabPanels', TabPanels)
  .component('TabPanel', TabPanel)
  .component('ToggleSwitch', ToggleSwitch)
  .component('TextareaTag', TextareaTag)
  .component('Textarea', Textarea)
  .component('InputNumber', InputNumber)
  .component('NumberInput', NumberInput)
  .component('ConfirmDialog', ConfirmDialog)
  .use(i18n)
  .use(router)

app.mount('#app')
