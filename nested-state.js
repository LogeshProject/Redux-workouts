
const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name : "logesh" ,
    address : {
        street : '123 main street',
        city : 'Thogaimalai',
        country : 'TamilNadu'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

function street_Update(street){

    return {
        type : STREET_UPDATED,
        payload : street
    }

}

const streetReducer = (state =initialState , action )=>{
    switch (action.type) {
        case STREET_UPDATED:
            
            // return {
            //     ...state , 
            //     address :{
            //         ...state.address,
            //         street : action.payload
            //     } 

            // }      

            return produce(state , (draft)=>{
                draft.address.street = action.payload
            })
    
        default:
            return state
    }
}

const store = redux.createStore(streetReducer)

console.log('initial state : ' , store.getState() );

const unsubscribe = store.subscribe(()=>{
    console.log('update state : ' , store.getState());
    
})

store.dispatch(street_Update('123 newStreet '))

unsubscribe()