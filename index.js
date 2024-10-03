const redux = require('redux')

const combineReducers = redux.combineReducers
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()


const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_ORDERED = 'ICE_ORDERED'
const ICE_RESTOCKED = 'ICE_RESTOCKED'


// action creater

function cake_ordered(qty=1){
    return{
        type: CAKE_ORDERED,
        payload : qty
    }
}
function cake_restocked(qty){
    return{
        type: CAKE_RESTOCKED,
        payload : qty
    }
}
function ice_ordered(qty=1){
    return{
        type: ICE_ORDERED,
        payload : qty
    }
}
function ice_restocked(qty){
    return{
        type: ICE_RESTOCKED,
        payload : qty
    }
}

const initialCakeState = {
    numOfCakes : 10
    
}
const initialIceState = {
    numOfIcecream : 20
    
}

const cakeReducer = (state = initialCakeState , action) =>{

    switch (action.type) {
        case CAKE_ORDERED:
            return {...state , numOfCakes : state.numOfCakes - action.payload }

        case CAKE_RESTOCKED:
            return {...state , numOfCakes : state.numOfCakes + action.payload }

        default:
           return state
    }
}
const iceReducer = (state = initialIceState , action) =>{

    switch (action.type) {
        case ICE_ORDERED:
            return {...state , numOfIcecream : state.numOfIcecream - action.payload }

        case ICE_RESTOCKED:
            return {...state , numOfIcecream : state.numOfIcecream + action.payload }

        default:
           return state
    }
}

const rootReducer = combineReducers({
    cake : cakeReducer ,
    iceCream : iceReducer
})

const store = createStore(rootReducer , applyMiddleware(logger))

console.log('Initial state : ', store.getState());


const unsubscribe = store.subscribe(()=>{})


const actions = bindActionCreators({cake_ordered, cake_restocked , ice_ordered , ice_restocked},store.dispatch)

actions.cake_ordered()
actions.cake_ordered()
actions.cake_ordered()
actions.cake_restocked(3)


actions.ice_ordered()
actions.ice_ordered()
actions.ice_ordered()
actions.ice_restocked(3)


unsubscribe()

