import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ElectricPrice from '@/page/home/ElectricPrice'
import Electric from '@/page/home/Electric'
import CopyReader from '@/page/home/CopyReader'
import AddElectric from '@/page/home/AddElectric'
import DeductionRecord from '@/page/home/DeductionRecord'
import PayRecord from '@/page/home/PayRecord'
import DeductionSum from '@/page/home/DeductionSum'
import AddReader from '@/page/home/AddReader'
import paySumMoney from '@/page/home/paySumMoney'
import Login from '@/page/Login'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: 'Electric',
      children: [
        {
          path: '/copyReader',
          name: 'CopyReader',
          component: CopyReader
        },
        {
          path: "/electric",
          name: 'Electric',
          component: Electric
        },
        {
          path: "/electricPrice",
          name: 'ElectricPrice',
          component: ElectricPrice
        },
        {
          path: "/addElectric",
          name: 'AddElectric',
          component: AddElectric
        },
        {
          path: "/addReader",
          name: 'AddReader',
          component: AddReader
        },
        {
          path: "/deductionRecord",
          name: 'DeductionRecord',
          component: DeductionRecord
        },
        {
          path: "/payRecord",
          name: 'PayRecord',
          component: PayRecord
        },
        {
          path: "/deductionSum",
          name: 'DeductionSum',
          component: DeductionSum
        },
        {
          path: "/paySumMoney",
          name: 'PaySumMoney',
          component: paySumMoney
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]

})
