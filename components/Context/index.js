import { createContext, useEffect, useReducer } from "react"
import tempDataReducer from "./tempDataReducer"
import { addAllTempData, addTempData, removeTempData } from "./tempDataAction"

const initTempData = {
    score: null,
    contributionData: null
}

export const TempDataContext = createContext(initTempData)

const AllContextProvider = ({children}) => {
    const [tempDataState, tempDataDispatch] = useReducer(tempDataReducer, initTempData)

    useEffect(() => {
        tempDataDispatch(addAllTempData(JSON.parse(window.localStorage.getItem('tempData'))))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('tempData', JSON.stringify(tempDataState))
    }, [tempDataState])

    return (
        <TempDataContext.Provider value={{
            score: tempDataState.score,
            contributionData: tempDataState.contributionData,
            addTempData: (name, data) => tempDataDispatch(addTempData(name, data)),
            removeTempData: name => tempDataDispatch(removeTempData(name))
        }}>
                {children}
        </TempDataContext.Provider>
    )
}

export default AllContextProvider