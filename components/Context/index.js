import { createContext, useEffect, useReducer } from "react"
import tempDataReducer from "./tempDataReducer"
import { addAllTempData, addTempData, removeTempData } from "./tempDataAction"
import languageReducer from "./languageReducer"
import { changeLanguage } from "./languageAction"

const initTempData = {
    score: null,
    contributionData: null
}

const initLanguage = {
    lang: 'bug'
}

export const TempDataContext = createContext(initTempData)
export const LanguageContext = createContext(initLanguage)

const AllContextProvider = ({ children }) => {
    const [tempDataState, tempDataDispatch] = useReducer(tempDataReducer, initTempData)
    const [languageState, languageDispatch] = useReducer(languageReducer, initLanguage)

    useEffect(() => {
        tempDataDispatch(addAllTempData(JSON.parse(window.localStorage.getItem('tempData'))))
        if (JSON.parse(window.localStorage.getItem('lang'))) {
            languageDispatch(changeLanguage(JSON.parse(window.localStorage.getItem('lang')).lang))
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('tempData', JSON.stringify(tempDataState))
        window.localStorage.setItem('lang', JSON.stringify(languageState))
    }, [tempDataState, languageState])

    return (
        <TempDataContext.Provider value={{
            score: tempDataState.score,
            contributionData: tempDataState.contributionData,
            addTempData: (name, data) => tempDataDispatch(addTempData(name, data)),
            removeTempData: name => tempDataDispatch(removeTempData(name))
        }}>
            <LanguageContext.Provider value={{
                lang: languageState.lang,
                changeLanguage: (lang) => languageDispatch(changeLanguage(lang))
            }}>
                {children}
            </LanguageContext.Provider>
        </TempDataContext.Provider>
    )
}

export default AllContextProvider