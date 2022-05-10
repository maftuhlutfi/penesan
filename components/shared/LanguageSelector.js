import { useContext } from "react";
import { LanguageContext } from "../Context";

const LanguageSelector = ({ dark, className }) => {
    const { lang, changeLanguage } = useContext(LanguageContext)

    return (
        <select className={`p-2 ml-4 rounded-lg lg:ml-8 focus:outline-none focus:ring-2 focus:ring-cust-red ${dark ? 'bg-white text-text-primary' : 'bg-red-100'} ${className}`} value={lang} onChange={e => changeLanguage(e.target.value)}>
            <option value='bug'>ᨅᨘᨁᨗᨔᨛ</option>
            <option value='indo'>Indonesia</option>
        </select>
    );
}

export default LanguageSelector;