
let lastId=0;
//initial value of store is []
export default function reducer(state=[],action)
{
    if(action.type === 'TaskAdded')
        return [...state,
    {
        id:lastId++,
        description : action.payload.description,
        resolved:false
    }
];

else if(action.type==='TaskRemove')
    return state.filter(task=>task.id !==action.payload.id)
    //copy all the tasks in the current state and produce new state
return state
}