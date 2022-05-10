import { useContext } from "react";
import { LanguageContext } from "../components/Context";
import translations from "../translations";

const useTranslations = (page) => {
    const { lang } = useContext(LanguageContext)

    return Object.keys(translations[page]).map((key, index) => translations[page][key].map((v => v[lang])))
}

export default useTranslations;