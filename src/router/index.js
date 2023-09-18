import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../view/Login.vue'
import patientMain from '../view/patientMain.vue'
import patientRegistration from '../view/patient/patientRegistration.vue'
import registrationRecord from '../view/patient/registrationRecord.vue'
import orderManage from '../view/patient/orderManage.vue'
import doctorMain from '../view/doctorMain.vue'
import workManage from '../view/doctor/workManage.vue' 
import registrationManage from '../view/doctor/registrationManage.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component:Login,
    },
    {
        path: '/patient',
        component:patientMain,
        redirect: '/patient/registration',
        children: [
            { path: 'registration', name: 'registration', component: patientRegistration },
            { path: 'record', name: 'record', component: registrationRecord },
            { path: 'order', name: 'order', component: orderManage },
        ]
    },
    {
        path: '/doctor',
        component: doctorMain,
        redirect: '/doctor/workManage',
        children: [
            {path:'workManage',name:'workManage',component:workManage},
            {path:'registrationManage',name:'registrationManage',component:registrationManage,
            },
        ]
        
    }
]

const router = new VueRouter({
    routes
})

export default router

Vue.use(VueRouter)