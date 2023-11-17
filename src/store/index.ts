import { useToggle } from './module/toggle'
import { useMyRouter } from './module/router'

export default function useStore(){
    return {
        toggle: useToggle(),
        myrouter: useMyRouter()
    }
}