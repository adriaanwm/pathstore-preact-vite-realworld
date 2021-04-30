import {useEffect, useState, useRef} from 'preact/hooks'
import {createStore} from 'pathstore-react'
import {useRequest} from '~/utils/useRequest'
import {createInit} from '~/store/init'
import {withPath} from '~/store/with'

export const store = createStore({useEffect, useState, useRef, reduxDevtools: true})

store.useRequest = useRequest(store)
store.with = withPath(store)
store.init = createInit(store)
store.init()
